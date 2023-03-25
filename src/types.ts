interface ILosslessOptions {
    extname?: string,
    resize?: {
        width?: number,
        height?: number,
        ignoreOverflowSize?: boolean, // 是否忽略 目標尺寸 大於 目前尺寸, 變成放大
    },
}
interface ILossyOptions extends ILosslessOptions {
    quality?: number, // 1 - 100
}


export declare type TLosslessSquash = (bufferData: Buffer, options: ILosslessOptions) => Promise<Buffer>
export declare type TLossySquash = (bufferData: Buffer, options: ILossyOptions) => Promise<Buffer>
