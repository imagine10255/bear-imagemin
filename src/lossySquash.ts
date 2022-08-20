import imagemin, {Plugin} from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import imageminPngquant from './png';
import sharp from 'sharp';

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
async function lossySquash(bufferData: Buffer, options?: {
    extname?: string,
    quality?: number, // 1 - 100
    resize?: {
        width?: number,
        height?: number
        ignoreOverflowSize?: boolean, // 是否忽略 目標尺寸 大於 目前尺寸, 變成放大
    },
}){
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
        png: [imageminPngquant({quality: quality})],
        webp: [imageminWebp({
            quality: quality, // 0 - 100 (100 有時會超過原圖大小)
            lossless: false,
            preset: 'picture',
        })]
    };
    const plugins = extPluginsMap[formatExtname];

    // 壓縮
    bufferData = await imagemin.buffer(bufferData, {plugins});

    return bufferData;
}


export default lossySquash;