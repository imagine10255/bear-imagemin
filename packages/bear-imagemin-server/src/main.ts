import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as fs from 'fs';
import {tmpPath} from './config';
import {Logger} from '@nestjs/common';


async function bootstrap() {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const logger = new Logger('Bootstrap');
    logger.debug(`Application ${packageJson.name}: ${packageJson.version}`);

    const app = await NestFactory.create(AppModule);

    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
    }

    await app.listen(3000);
}
bootstrap();
