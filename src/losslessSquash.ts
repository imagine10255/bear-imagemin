import imagemin, {Plugin} from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import imageminWebp from 'imagemin-webp';
import sharp from 'sharp';
import os from 'os';
import {
    TLosslessSquash,
    TExtname
} from './types';
import {Transform} from 'stream';
import {createReadStream, promises as fsPromises} from 'node:fs';
import {ulid} from 'ulid';


import {extname} from 'node:path';


interface IPlugMap {
    [types: string]: Plugin[],
}


/**
 * 無損壓縮
 * losslessSquash-jpegtran https://github.com/imagemin/imagemin-jpegtran
 * losslessSquash-pngquant https://github.com/imagemin/imagemin-optipng
 *
 * @param filePath
 * @param options
 */
const losslessSquash: TLosslessSquash = async (filePath, options) => {
    // 縮圖
    const resize = options?.resize;
    const fileExtname = options?.extname;



    const formatExtname = options?.extname ?? extname(filePath)
        .replace('.','')
        .replace('jpeg','jpg');

    const savePath = `${os.tmpdir()}/${ulid().toLowerCase()}${formatExtname}`;
    if(resize || options?.extname !== fileExtname){

        await new Promise((resolve, rejects) => {
            const sharpLib = sharp(filePath);
            if(resize){
                const ignoreOverflowSize = resize.ignoreOverflowSize ?? false;
                sharpLib.resize(resize?.width, resize?.height, {withoutEnlargement: !ignoreOverflowSize});
            }

            if(options?.extname){
                sharpLib
                    .toFormat(formatExtname as TExtname);
            }

            sharpLib
                .toFile(savePath, (err, info) => {
                    if(err){
                        rejects(`losslessSquash sharp error: ${err.message}`);
                        return;
                    }
                    resolve(savePath);
                });
        });
    }


    const extPluginsMap: IPlugMap = {
        jpg: [imageminJpegtran()],
        png: [imageminOptipng()],
        webp: [imageminWebp({
            lossless: true,
            preset: 'picture'
        })]
    };
    const plugins = extPluginsMap[formatExtname];

    // 壓縮
    const bufferTransform = new Transform({
        transform: (chunk, _, callback) => {
            buffer.push(chunk);
            callback();
        }
    });


    const buffer: Buffer[] = [];
    return new Promise<Buffer>((resolve, reject) => {
        createReadStream(savePath)
            .pipe(bufferTransform)
            .on('finish', async () => {
                const optimizedBuffer = await imagemin.buffer(Buffer.concat(buffer), {plugins});
                resolve(optimizedBuffer);
                if (resize) {
                    await fsPromises.unlink(savePath);
                }
            })
            .on('error', async (error) => {
                reject(error);
                if (resize) {
                    await fsPromises.unlink(savePath);
                }
            });
    });
};


export default losslessSquash;
