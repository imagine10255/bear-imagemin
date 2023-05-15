import imagemin, {Plugin} from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import imageminWebp from 'imagemin-webp';
import sharp from 'sharp';
import os from 'os';
import {TLosslessSquash} from './types';
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
 * @param bufferData
 * @param options
 */
const losslessSquash: TLosslessSquash = async (path, options) => {
    // 縮圖
    const resize = options?.resize;

    let tmpPath = path;
    if(resize){
        tmpPath = `${os.tmpdir()}/${ulid().toLowerCase()}${extname(path)}`;
        const ignoreOverflowSize = resize.ignoreOverflowSize ?? false;
        tmpPath = await new Promise((resolve, rejects) => {
            sharp(path)
                .resize(resize?.width, resize?.height, {withoutEnlargement: !ignoreOverflowSize})
                .toFile(tmpPath, (err, info) => {
                    if(err){
                        rejects(`losslessSquash sharp error: ${err.message}`);
                        return;
                    }
                    resolve(tmpPath);
                });
        });
    }

    const formatExtname = options?.extname ?? 'webp'
        .replace('.','')
        .replace('jpeg','jpg');

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
        createReadStream(tmpPath)
            .pipe(bufferTransform)
            .on('finish', async () => {
                const optimizedBuffer = await imagemin.buffer(Buffer.concat(buffer), {plugins});
                resolve(optimizedBuffer);
                if (resize) {
                    await fsPromises.unlink(tmpPath);
                }
            })
            .on('error', async (error) => {
                reject(error);
                if (resize) {
                    await fsPromises.unlink(tmpPath);
                }
            });
    });

};


export default losslessSquash;
