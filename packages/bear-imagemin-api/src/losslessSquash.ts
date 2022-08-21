import * as fs from 'fs';
import {Stream} from 'stream';
import * as apisauce from 'apisauce';
import * as FormData from 'form-data';



/**
 * 無損壓縮
 * losslessSquash-jpegtran https://github.com/imagemin/imagemin-jpegtran
 * losslessSquash-pngquant https://github.com/imagemin/imagemin-optipng
 *
 * @param bufferData
 * @param options
 */
/**
 * 圖片壓縮API
 * @param filePath
 * @param savePath
 * @param options
 */
async function losslessSquash(filePath: string, savePath: string, options?: {
    extname?: string,
    resize?: {
        width?: number,
        height?: number
    },
    ignoreOverflowSize?: boolean,
}){
    const {imageSquashUrl} = this.getConfig();

    const data = new FormData();
    data.append('sourceFile', fs.createReadStream(filePath));

    if(options?.resize.width){
        data.append('resizeWidth', String(options.resize.width));
    }
    if(options?.resize.height){
        data.append('resizeHeight', String(options.resize.height));
    }
    if(options?.ignoreOverflowSize){
        data.append('ignoreOverflowSize', String(options.ignoreOverflowSize));
    }
    if(options?.extname){
        data.append('extname', options.extname);
    }

    const api = apisauce.create({baseURL: imageSquashUrl});
    return api.post<Stream>('/api/losslessSquash', data, {
        headers: {
            ...data.getHeaders(),
        },
        responseType: 'stream',
    }).then(res => {
        return new Promise((resolve, reject) => {
            return res.data
                .pipe(fs.createWriteStream(savePath))
                .on('finish', () => resolve(savePath))
                .on('error', e => reject(e));
        });
    });
}



export default losslessSquash;