import axios from 'axios';
import * as fs from 'fs';
import {IBearImageminClient, IOptions} from './types';

const FormData = require('form-data');

/**
 * BearImageminClient
 * 圖片壓縮客戶端
 */
export default class BearImageminClient implements IBearImageminClient{
    protected _baseUrl = 'http://localehost:8082';

    constructor(baseUrl?: string) {
        if(baseUrl){
            this._baseUrl = baseUrl;
        }
    }


    /**
     * 壓縮轉 base64
     * @param filePath
     * @param savePath
     * @param options (如有設定 quality 或小於100 則為有損)
     */
    private getFormData(filePath: string, options?: IOptions){
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

        return data;

    }


    /**
     * 轉 Base64
     * @param filePath
     * @param options (如有設定 quality 或小於100 則為有損)
     */
    async toBase64(filePath: string, options?: IOptions){
        const data = this.getFormData(filePath, options);

        const timeout = options?.timeout ?? 30 * 1000;

        return new Promise<string>((resolve, reject) => {

            axios.post(`${this._baseUrl}/squash`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Cache-Control': 'no-cache',
                },
                responseType: 'arraybuffer', // 修改為 arraybuffer 以便處理二進制數據
                timeout,
            })
                .then(res => {

                    if(!res.data){
                        reject({
                            code: 500,
                            message: 'error! response data is null',
                        });
                        return;
                    }

                    // 將二進制數據轉換為 Base64 字符串
                    const base64 = Buffer.from(res.data, 'binary').toString('base64');
                    resolve(base64);

                })
                .catch(res => {
                    reject({
                        code: res.code,
                        message: res.message,
                    });
                })
        });
    }




    /**
     * 壓縮
     * @param filePath
     * @param savePath
     * @param options (如有設定 quality 或小於100 則為有損)
     */
    async squash(filePath: string, savePath: string, options?: IOptions){
        const data = this.getFormData(filePath, options);

        const timeout = options?.timeout ?? 30 * 1000;

        return new Promise<string>((resolve, reject) => {

            axios.post(`${this._baseUrl}/squash`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Cache-Control': 'no-cache',
                },
                responseType: 'stream',
                timeout,
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

