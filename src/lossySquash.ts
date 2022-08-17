import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import sharp from 'sharp';
import * as fs from 'fs';


/**
 * 有損傷壓縮
 * losslessSquash-mozjpeg https://github.com/imagemin/imagemin-mozjpeg
 * losslessSquash-pngquant https://github.com/imagemin/imagemin-pngquant
 *
 * @param sourceFile
 * @param options
 */
async function lossySquash (sourceFile: string, options?: {
    quality?: number, // 1 - 100
    resize?: {
        width?: number,
        height?: number
    },
}){
    let quality = options?.quality ?? .75;
    quality = quality > .9 ? .9: quality;

    // 原圖
    let bufferData = fs.readFileSync(sourceFile);

    // 縮圖
    const resize = options?.resize;
    if(resize){
        bufferData = await sharp(bufferData)
            .resize(resize?.width, resize?.height)
            .toBuffer();
    }

    // 壓縮
    bufferData = await imagemin.buffer(bufferData, {
        plugins: [
            imageminMozjpeg({
                quality: quality * 100, // 0 - 100 (100 有時會超過原圖大小)
            }),
            imageminPngquant({
                quality: [0.1, quality]    // [0, 1]
            })
        ]
    });


    return bufferData;
}


export default lossySquash;