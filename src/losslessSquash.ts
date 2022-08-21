import imagemin, {Plugin} from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import imageminWebp from 'imagemin-webp';
import sharp from 'sharp';
import {TLosslessSquash} from './typings';


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
const losslessSquash: TLosslessSquash = async (bufferData, options) => {
    // 縮圖
    const resize = options?.resize;

    if(resize){
        const ignoreOverflowSize = resize.ignoreOverflowSize ?? false;
        bufferData = await sharp(bufferData)
            .resize(resize?.width, resize?.height, {withoutEnlargement: !ignoreOverflowSize})
            .toBuffer();
    }

    const formatExtname = options?.extname ?? '.webp'
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
    bufferData = await imagemin.buffer(bufferData, {plugins});

    return bufferData;
};


export default losslessSquash;