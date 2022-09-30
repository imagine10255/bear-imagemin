import * as fs from 'fs';
import {IBearImageminClient} from './typings';
import {apiService, requestHeader} from './api';

const FormData = require('form-data');

/**
 * BearImageminClient
 * 圖片壓縮客戶端
 */
export default class BearImageminClient implements IBearImageminClient{
    protected _baseUrl = 'http://localehost:3001';

    constructor(baseUrl?: string) {
        if(baseUrl){
            this._baseUrl = baseUrl;
        }
    }


    /**
     * 壓縮
     * @param filePath
     * @param savePath
     * @param options (如有設定 quality 或小於100 則為有損)
     */
    async squash(filePath: string, savePath: string, options?: {
        extname?: string,
        resize?: {
            width?: number,
            height?: number
        },
        quality?: number,
        ignoreOverflowSize?: boolean,
    }){
        const data = new FormData();
        data.append('sourceFile', fs.createReadStream(filePath));

        if(options?.resize?.width){
            data.append('resizeWidth', String(options.resize.width));
        }
        if(options?.resize?.height){
            data.append('resizeHeight', String(options.resize.height));
        }
        if(options?.ignoreOverflowSize){
            data.append('ignoreOverflowSize', String(options.ignoreOverflowSize));
        }
        if(options?.quality){
            data.append('quality', String(options.quality));
        }
        if(options?.extname){
            data.append('extname', options.extname);
        }

        return new Promise<string>((resolve, reject) => {

            apiService.post(`${this._baseUrl}/api/squash`, data, {
                headers: {
                    ...requestHeader.formData,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                responseType: 'stream',
                timeout: 5 * 60 * 1000
            })
            .then(res => {

                if(!res.data){
                    reject({
                        code: 500,
                        message: 'error! response data is null',
                    });
                    return;
                }

                return res.data
                    .pipe(fs.createWriteStream(savePath))
                    .on('finish', () => resolve(savePath))
                    .on('error', (e: any) => reject(e));

            })
            .catch(res => {
                reject({
                    code: res.code,
                    message: res.message,
                });
            })
        });



    }

}

