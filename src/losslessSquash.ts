import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import sharp from 'sharp';
import fs from 'fs';


/**
 * 無傷壓縮
 * losslessSquash-jpegtran https://github.com/imagemin/imagemin-jpegtran
 * losslessSquash-pngquant https://github.com/imagemin/imagemin-optipng
 *
 * @param sourceFile
 * @param options
 */
async function losslessSquash (sourceFile: string, options: {
    resize?: {
        width?: number,
        height?: number
    },
}){
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
            imageminJpegtran(),
            imageminOptipng()
        ]
    });

    return bufferData;
}


export default losslessSquash;