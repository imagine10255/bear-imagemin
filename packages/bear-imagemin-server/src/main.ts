import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as fs from 'fs';
import {tmpPath} from './config';


async function bootstrap() {
    console.log(`${process.env.npm_package_name} version: ${process.env.npm_package_version}`);
    const app = await NestFactory.create(AppModule);

    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
    }

    await app.listen(3000);
}
bootstrap();
