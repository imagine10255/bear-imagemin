import {TransformFnParams} from 'class-transformer/types/interfaces';

export const toBoolean = (params: TransformFnParams) => {
    switch (params.value) {
    case true:
    case 'true':
    case 1:
        return true;
    case false:
    case 'false':
    case 0:
        return false;
    default:
        return params.value;
    }
};


/**
 * 轉換為 Number, 數字才轉換
 * @param params
 */
export const toNumber = (params: TransformFnParams) => {
    if(new RegExp(/^(\d+)$/).test(params.value)){
        if(Number.isFinite(params.value)){
            return params.value;
        }
        return Number(params.value);
    }
    return params.value;
};
