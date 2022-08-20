import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import imageminWebp from 'imagemin-webp';
import sharp from 'sharp';
import * as Buffer from 'buffer';


/**
 * 無損壓縮
 * losslessSquash-jpegtran https://github.com/imagemin/imagemin-jpegtran
 * losslessSquash-pngquant https://github.com/imagemin/imagemin-optipng
 *
 * @param bufferData
 * @param options
 */
async function losslessSquash (bufferData: Buffer, options: {
    resize?: {
        width?: number,
        height?: number,
        ignoreOverflowSize?: boolean, // 是否忽略 目標尺寸 大於 目前尺寸, 變成放大
    },
}){
    // 縮圖
    const resize = options?.resize;

    if(resize){
        const ignoreOverflowSize = resize.ignoreOverflowSize ?? false;
        bufferData = await sharp(bufferData)
            .resize(resize?.width, resize?.height, {withoutEnlargement: !ignoreOverflowSize})
            .toBuffer();
    }

    // 壓縮
    bufferData = await imagemin.buffer(bufferData, {
        plugins: [
            // imageminJpegtran(),
            // imageminWebp({
            //     lossless: true,
            // }),
            imageminOptipng()
        ]
    });

    return bufferData;
}


export default losslessSquash;