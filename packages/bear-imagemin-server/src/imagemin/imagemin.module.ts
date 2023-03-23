import {Module} from '@nestjs/common';
import {MulterModule, MulterModuleOptions} from '@nestjs/platform-express';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {diskStorage} from 'multer';
import {ImageminController} from './controller/imagemin.controller';
import {getTmpPath, modifyFileName} from '../utils/file';
import {imageFileFilter} from '../utils/file';
import imageminConfig, {configKey, IImageminConfig} from './config/imagemin.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [imageminConfig],
        }),
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<MulterModuleOptions> => {
                const {fileSize} = configService.get<IImageminConfig>(configKey);
                return {
                    storage: diskStorage({
                        destination: getTmpPath,
                        filename: modifyFileName,
                    }),
                    limits: {
                        fileSize,
                    },
                    fileFilter: imageFileFilter,
                };
            },
        }),
    ],
    controllers: [ImageminController],
    providers: [],
})
export class ImageminModule {}
