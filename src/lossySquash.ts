import imagemin, {Plugin} from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';

import sharp from 'sharp';
import {TLossySquash, TExtname} from './types';
import os from 'os';
import {ulid} from 'ulid';
import {extname} from 'node:path';
import {Transform} from 'stream';
import {createReadStream, promises as fsPromises} from 'node:fs';


interface IPlugMap {
    [types: string]: Plugin[],
}

/**
 * 有損壓縮
 * losslessSquash-mozjpeg https://github.com/imagemin/imagemin-mozjpeg
 * losslessSquash-pngquant https://github.com/imagemin/imagemin-pngquant
 *
 * @param filePath
 * @param options
 */
const lossySquash: TLossySquash = async (filePath, options) => {
    const quality = options?.quality ?? 75;


    // 縮圖
    const resize = options?.resize;
    const fileExtname = options?.extname;



    const formatExtname = options?.extname ?? extname(filePath)
        .replace('.','')
        .replace('jpeg','jpg');

    const savePath = `${os.tmpdir()}/${ulid().toLowerCase()}${formatExtname}`;
    if(resize || fileExtname){

        await new Promise((resolve, rejects) => {
            const sharpLib = sharp(filePath);
            if(resize){
                const ignoreOverflowSize = resize.ignoreOverflowSize ?? false;
                sharpLib.resize(resize?.width, resize?.height, {withoutEnlargement: !ignoreOverflowSize});
            }


            sharpLib
                .toFormat(formatExtname as TExtname)
                .toFile(savePath, (err, info) => {
                    if(err){
                        rejects(`losslessSquash sharp error: ${err.message}`);
                        return;
                    }
                    resolve(savePath);
                });

        });
    }


    // 0 - 100 (100 有時會超過原圖大小)
    const extPluginsMap: IPlugMap = {
        jpg: [imageminMozjpeg({quality})],
        png: [imageminPngquant({quality: [0, .8]})],
        webp: [imageminWebp({
            quality: quality,
            lossless: false,
            preset: 'picture',
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


export default lossySquash;
