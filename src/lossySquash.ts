import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import {queue} from 'sharp';


/**
 * 有損傷壓縮
 * imagemin-mozjpeg https://github.com/imagemin/imagemin-mozjpeg
 * imagemin-pngquant https://github.com/imagemin/imagemin-pngquant
 *
 * @param sourceFile
 * @param options
 */
async function lossySquash (sourceFile: string, options: {
    quality: number, // 1 - 100
    resize?: {
        width?: number,
        height?: number
        isCheckIgnore?: boolean,
    },
}){
    let quality = options?.quality ?? .75;
    quality = quality > .9 ? .9: quality;


    const res = await imagemin([sourceFile], {
        plugins: [
            imageminMozjpeg({
                quality: quality * 100, // 0 - 100 (100 有時會超過原圖大小)
            }),
            imageminPngquant({
                quality: [0.1, quality]    // [0, 1]
            })
        ]
    });

    return res[0];
}


export default lossySquash;