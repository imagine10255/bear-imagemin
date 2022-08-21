import imagemin, {Plugin} from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';

import sharp from 'sharp';
import {TLossySquash} from './typings';

interface IPlugMap {
    [types: string]: Plugin[],
}

/**
 * 有損壓縮
 * losslessSquash-mozjpeg https://github.com/imagemin/imagemin-mozjpeg
 * losslessSquash-pngquant https://github.com/imagemin/imagemin-pngquant
 *
 * @param bufferData
 * @param options
 */
const lossySquash: TLossySquash = async (bufferData, options) => {
    const quality = options?.quality ?? 75;

    // 縮圖
    const resize = options?.resize;
    if(resize){
        const ignoreOverflowSize = resize?.ignoreOverflowSize ?? false;
        bufferData = await sharp(bufferData)
            .resize(resize?.width, resize?.height, {withoutEnlargement: !ignoreOverflowSize})
            .toBuffer();
    }

    const formatExtname = options?.extname ?? '.webp'
        .replace('.','')
        .replace('jpeg','jpg');

    // 0 - 100 (100 有時會超過原圖大小)
    const extPluginsMap: IPlugMap = {
        jpg: [imageminMozjpeg({quality: quality})],
        png: [imageminPngquant({quality: [0, .8]})],
        webp: [imageminWebp({
            quality: quality,
            lossless: false,
            preset: 'picture',
        })]
    };
    const plugins = extPluginsMap[formatExtname];

    // 壓縮
    bufferData = await imagemin.buffer(bufferData, {plugins});

    return bufferData;
};


export default lossySquash;