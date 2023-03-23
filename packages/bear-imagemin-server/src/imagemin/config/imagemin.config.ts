import {registerAs} from '@nestjs/config';

export interface IImageminConfig {
    fileSize: number,
    timeout: number,
}

export const configKey = 'imagemin';
const configFactory = (): IImageminConfig => {
    return {
        fileSize: (1024 * 1024) * 5, //5MB
        timeout: 5000,
    };
};


export default registerAs<IImageminConfig>(configKey, configFactory);
