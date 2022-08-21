export declare type TLosslessSquash = (bufferData: Buffer, options: {
    extname?: string,
    resize?: {
        width?: number,
        height?: number,
        ignoreOverflowSize?: boolean, // 是否忽略 目標尺寸 大於 目前尺寸, 變成放大
    },
}) => Promise<Buffer>


export declare type TLossySquash = (bufferData: Buffer, options: {
    extname?: string,
    quality?: number, // 1 - 100
    resize?: {
        width?: number,
        height?: number,
        ignoreOverflowSize?: boolean, // 是否忽略 目標尺寸 大於 目前尺寸, 變成放大
    },
}) => Promise<Buffer>