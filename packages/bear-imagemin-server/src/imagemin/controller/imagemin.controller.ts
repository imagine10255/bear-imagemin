import {Body, Controller, Get, Post, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {FileInterceptor} from '@nestjs/platform-express';
import * as fs from 'fs';
import {losslessSquash, lossySquash} from 'bear-node-imagemin';
import {SquashDto} from '../dto/imagemin.dto';
import {contentTypeMap} from '../config/content-type';
import {configKey, IImageminConfig} from '../config/imagemin.config';



@Controller()
export class ImageminController {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    @Get()
    getHelloGet(): string {
        return 'Hello World! Imagemin';
    }
    @Post()
    getHelloPost(): string {
        return 'Hello World! Imagemin';
    }


    /**
     * 取得設定檔
     */
    getConfig(): IImageminConfig {
        return this.configService.get<IImageminConfig>(configKey);
    }

    @Post('squash')
    @UseInterceptors(FileInterceptor('sourceFile'))
    async squash(
        @Res() res,
        @Body() body: SquashDto,
        @UploadedFile() sourceFile: Express.Multer.File,
    ): Promise<void> {


        const extname = (body.extname ?? '.webp')
            .replace('.', '')
            .replace('jpeg', 'jpg');

        const isLossLess = !(body.quality && body.quality < 99);
        const params = {
            quality: isLossLess ? undefined: body.quality,
            resize: {
                width: body.resizeWidth,
                height: body.resizeHeight,
                ignoreOverflowSize: body.ignoreOverflowSize,
            },
            extname,
        };

        // 讀檔案
        const fileBuffer = fs.readFileSync(sourceFile.path);

        const {timeout} = this.getConfig();

        console.log('timeout', timeout);

        try {
            const contentType = contentTypeMap[extname];

            const newBuff = await Promise.race([
                isLossLess ? losslessSquash(fileBuffer, params) : lossySquash(fileBuffer, params),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Image processing timed out')), timeout)),
            ]);
            console.log('newBuff squash');


            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Disposition': 'attachment; filename=' + `image.${extname}`,
            });

            res.end(newBuff);

        } catch (e) {
            res.status(500).json({
                message: e,
            });
            return;
        }
    }

}
