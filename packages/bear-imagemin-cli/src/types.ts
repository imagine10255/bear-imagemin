export interface ILosslessSquashArgs {
    sourceFile: string,
    saveFile: string,
    width?: number,
    height?: number,
    ignoreOverflowSize?: boolean,
}


export interface ILossySquashArgs extends ILosslessSquashArgs {
    quality?: number,
}
