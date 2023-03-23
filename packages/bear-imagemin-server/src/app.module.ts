import {Module} from '@nestjs/common';
import {APP_PIPE} from '@nestjs/core';
import {ValidationPipe} from './common/pipes/validationPipe.pipe';
import {ImageminModule} from './imagemin/imagemin.module';

@Module({
    imports: [
        ImageminModule,
    ],
    providers: [
        {provide: APP_PIPE, useClass: ValidationPipe},
    ],
})
export class AppModule {}
