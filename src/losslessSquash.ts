import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import sharp from 'sharp';


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
    const res = await imagemin([sourceFile], {
        plugins: [
            imageminJpegtran(),
            imageminOptipng()
        ]
    });


    const resize = options?.resize;
    if(resize){
        res[0].data = await sharp(res[0].data)
            .resize(resize?.width, resize?.height)
            .toBuffer();
    }

    return res[0];
}


export default losslessSquash;