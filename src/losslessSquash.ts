import imagemin, {Plugin} from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import imageminWebp from 'imagemin-webp';
import sharp from 'sharp';


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
async function losslessSquash (bufferData: Buffer, options: {
    extname?: string,
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

    const formatExtname = options?.extname ?? '.webp'
        .replace('.','')
        .replace('jpeg','jpg');

    // 0 - 100 (100 有時會超過原圖大小)
    const extPluginsMap: IPlugMap = {
        jpg: [imageminJpegtran()],
        png: [imageminOptipng()],
        webp: [imageminWebp()]
    };
    const plugins = extPluginsMap[formatExtname];

    // 壓縮
    bufferData = await imagemin.buffer(bufferData, {plugins});

    return bufferData;
}


export default losslessSquash;