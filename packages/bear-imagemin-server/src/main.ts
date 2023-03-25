import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as fs from 'fs';
import {tmpPath} from './config';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';


async function bootstrap() {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const logger = new Logger('Bootstrap');
    logger.debug(`Application ${packageJson.name}: ${packageJson.version}`);

    const app = await NestFactory.create(AppModule);


    const configService = app.get(ConfigService);
    const port = configService.get('PORT', 3000);

    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
    }

    await app.listen(port);
}
bootstrap();
