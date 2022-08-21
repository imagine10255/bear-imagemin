export declare interface IBearImageminClient {
    squash: (filePath: string, savePath: string, options?: {
        extname?: string,
        resize?: {
            width?: number,
            height?: number
        },
        quality?: number,
        ignoreOverflowSize?: boolean,
    }) => Promise<string>
}