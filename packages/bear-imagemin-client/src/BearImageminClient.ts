import * as fs from 'fs';
import {Stream} from 'stream';
import * as apisauce from 'apisauce';
import {IBearImageminClient} from './typings';

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

        const api = apisauce.create({baseURL: this._baseUrl});
        return api.post<Stream>('/api/squash', data, {
            headers: {
                ...data.getHeaders(),
            },
            responseType: 'stream',
        }).then(res => {

            return new Promise<string>((resolve, reject) => {
                if(!res.ok){
                    reject({
                        status: res.status,
                        code: res.problem,
                        message: `error! problem is ${res.problem}`
                    });
                    return;

                }else if(!res.data){
                    reject({
                        status: res.status,
                        code: res.problem,
                        message: 'error! response data is null',
                    });
                    return;
                }
                return res.data
                    .pipe(fs.createWriteStream(savePath))
                    .on('finish', () => resolve(savePath))
                    .on('error', e => reject(e));
            });
        });
    }

}

