import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as fs from 'fs';
import {tmpPath} from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
    }

    await app.listen(3000);
}
bootstrap();
