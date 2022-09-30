import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';


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
    },
    timeout: 6 * 60 * 1000,
});


const reMapping: <T>(apiRequest: any) => any = (apiRequest) => {
    return apiRequest;
};

export default {
    get: async (url: string, params?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.get(url, {...config, params})),
    delete: async (url: string, data?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.delete(url, {...config, data: data})),
    post: async (url: string, data?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.post(url, data, config)),
    put: async (url: string, data?: {}, config?: AxiosRequestConfig) => reMapping(await apiService.put(url, data, config)),
};
