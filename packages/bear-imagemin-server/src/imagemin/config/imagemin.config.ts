import {registerAs} from '@nestjs/config';

export interface IImageminConfig {
    fileLimit: number,
    timeout: number,
}

export const configKey = 'imagemin';
const configFactory = (): IImageminConfig => {
    return {
        fileLimit: Number(process.env.IMAGEMIN_FILE_LIMIT ?? 20 * (1024 * 1024)), //20MB
        timeout: Number(process.env.IMAGEMIN_TIMEOUT ?? 30 * 1000),
    };
};


export default registerAs<IImageminConfig>(configKey, configFactory);
