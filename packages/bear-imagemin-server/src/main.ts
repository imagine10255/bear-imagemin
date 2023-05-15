import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as fs from 'fs';
import {tmpPath} from './config';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {readPackageJson} from './utils/file';


async function bootstrap() {
    readPackageJson()
        .then(data => {
            const logger = new Logger('Bootstrap');
            logger.debug(`Application ${data.name}: ${data.version}`);
        });

    const app = await NestFactory.create(AppModule);


    const configService = app.get(ConfigService);
    const port = configService.get('PORT', 8080);

    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
    }

    await app.listen(port);
}
bootstrap();
