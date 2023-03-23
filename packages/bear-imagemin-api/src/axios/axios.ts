// import {ApiResponse, ApisauceInstance, create} from 'axios';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {autoMapper} from 'bear-jsutils/object';
import SystemException from 'common/exception/system.exception';
import { isNotEmpty } from 'utils/equal';
import {IApiService} from "./types";
import * as iconv from "iconv-lite";


export const requestHeader = {
    formData: {'Content-Type': 'multipart/form-data'},
    formUrlDecode: {'Content-Type': 'application/x-www-form-urlencoded'},  // 需加 qs.stringify()
    json: {'Content-Type': 'application/json'},
};

export const apiService: AxiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        ...requestHeader.json,
        'Cache-Control': 'no-cache',
        // Extend Headers...
        // 'Site-ID': siteId, // 由 Server端(Nginx)設定
    },
    timeout: 20 * 1000,
});

const reMapping: <T>(apiRequest: any) => any = (apiRequest) => {
    return apiRequest ? autoMapper(apiRequest, {data: 'body'}) : undefined;
};




function createApiService<T>(baseURL?: string, options?: {
    headers?: any,
    timeout?: number,
    encoding?: string,
}): IApiService {

    let extendConfig = {};
    if(options?.encoding){
        extendConfig = {
            responseType: 'arraybuffer',
            responseEncoding: 'binary'
        }
    }

    const apiService: AxiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            ...options?.headers,
            ...extendConfig,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
        },
        timeout: options?.timeout ?? 1000 * 60 * 2,

    });


    /**
     * Request After Middleware
     */
    apiService.interceptors.request.use(
        (config) => new Promise(resolve => {
            console.log(`[API REQ] Url: ${config.url}, Token: ${isNotEmpty(config.headers['access-token']) ? 'Yes':'No'}`);
            resolve({
                ...config,
                ...extendConfig,
            });
        }),
        (error) => {
            Promise.reject(`[axios error] ${JSON.stringify(error)}`);
        },
    );


    apiService.interceptors.response.use(
        (response) => {

            if(options?.encoding){
                const data = iconv.decode(Buffer.from(response.data), options.encoding);
                return Promise.resolve({
                    ...response,
                    data,
                });
            }


            return Promise.resolve(response);


            // 使用非 HTTP STATUS 判斷錯誤攔截
            // if(response.status && String(response.status).startsWith('3')){
            //     return Promise.resolve(response);
            // }
            //
            // return Promise.reject(
            //     new SystemException({message: 'No reason error'}),
            // );
        },
        (error) => {

            const config = error.config;
            console.log('[axios error2]', JSON.stringify(error));

            if(error.response?.status){
                switch (error.response.status) {
                    case 400:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_400',
                            message: 'http400: bad request',
                        }, HttpStatus.BAD_REQUEST);

                    case 401:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_401',
                            message: 'http401: not auth',
                        }, HttpStatus.UNAUTHORIZED);

                    case 403:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_403',
                            message: 'http403: not auth',
                        }, HttpStatus.UNAUTHORIZED);

                    case 404:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_404',
                            message: 'http404: not found',
                        }, HttpStatus.NOT_FOUND);

                    case 413:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_413',
                            message: 'http413: request size max out',
                        }, HttpStatus.PAYLOAD_TOO_LARGE);

                    case 500:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_500',
                            message: 'http500: server error',
                        }, HttpStatus.INTERNAL_SERVER_ERROR);

                    case 504:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_504',
                            message: 'http504: getway timeout',
                        }, HttpStatus.GATEWAY_TIMEOUT);

                    case 511:
                        throw new HttpException({
                            statusCode: 'HTTP_STATUS_511',
                            message: 'http504: no access',
                        }, 511);

                    default:
                }


                Promise.reject(error.response);
                throw new SystemException({message: error.response.data.message, code: error.response?.data?.code ?? `SERVICE_HTTP_${error.response.status}`}, 500);
            }


            throw new SystemException({message: error.message, code: `SERVICE_HTTP_${error.code}`}, 500);

        },
    );

    return {
        get: async (url: string, params?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.get(url, {...config, params})),
        delete: async (url: string, data?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.delete(url, {...config, data: data})),
        post: async (url: string, data?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.post(url, data, config)),
        put: async (url: string, data?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.put(url, data, config)),
        any: async (config?: AxiosRequestConfig) => reMapping(await apiService(config)),
    };
}

export default createApiService;
