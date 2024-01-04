interface ILosslessOptions {
    extname?: TExtname
    resize?: {
        width?: number,
        height?: number,
        ignoreOverflowSize?: boolean, // 是否忽略 目標尺寸 大於 目前尺寸, 變成放大
    },
}
interface ILossyOptions extends ILosslessOptions {
    quality?: number, // 1 - 100
}

export type TExtname = 'jpg'|'png'|'webp';


export declare type TLosslessSquash = (bufferData: string, options: ILosslessOptions) => Promise<Buffer>
export declare type TLossySquash = (bufferData: string, options: ILossyOptions) => Promise<Buffer>
