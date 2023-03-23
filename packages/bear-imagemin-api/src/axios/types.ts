import {AxiosRequestConfig} from "axios";

export interface IApiService {
    get: <T = IApiResponseBody>(url: string, params?: {}, config?: AxiosRequestConfig) => Promise<T>;
    delete: <T = IApiResponseBody>(url: string, data?: {}, config?: AxiosRequestConfig) => Promise<T>;
    post: <T = IApiResponseBody>(url: string, data?: {}, config?: AxiosRequestConfig) => Promise<T>;
    put: <T = IApiResponseBody>(url: string, data?: {}, config?: AxiosRequestConfig) => Promise<T>;
    any: <T = IApiResponseBody>(config?: AxiosRequestConfig) => Promise<T>;
}


export interface IResponseBody<D = any> {
    data: D;
    formMessage: unknown;
    message: string;
    code: string;
    statusType: 'error'|'success';
}

// export type TApiResponseBody<D = any> = Exclude<ApiResponse<IResponseBody<D>>;
export interface IApiResponseBody<D = any> {
    body: IResponseBody<D>;
    ok: boolean;
}


// export type TApiResponseBody<D = any> = Exclude<ApiResponse<IResponseBody<D>>;
export interface IApiResponse<D = any> {
    body: D;
    ok: boolean;
    headers: {
        'content-disposition': string,
    };
    config: any;
}


export type TApiCreateDataRes<T = any> = IApiResponseBody<{ newId: number, newData?: T}>;
export type TApiCreateDataReturnNewDataRes<T = any> = IApiResponseBody<{ newId: number, newData: T}>;
export type TApiUploadFileRes = IApiResponseBody<{ newId: number, fileUrl: string}>;
export type TApiUpdateDataRes = IApiResponseBody<{ updateCount: number}>;
export type TApiDeleteDataRes = IApiResponseBody<{ deleteCount: number}>;

export type TApiUploadDataRes<T = any> = IApiResponseBody<{ newId: number, newData: T}>;

export type IRequestPaginateMeta = {
    currentPage: number,
    pageLimit: number,
    sortBy?: string,
    sortField?: 'DESC'|'ASC',
};
