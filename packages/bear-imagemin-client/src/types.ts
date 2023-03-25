export interface IOptions {
    extname?: string,
    resize?: {
        width?: number,
        height?: number
    },
    quality?: number,
    ignoreOverflowSize?: boolean,
    timeout?: number,
}


export declare interface IBearImageminClient {
    squash: (filePath: string, savePath: string, options?: IOptions) => Promise<string>
}
