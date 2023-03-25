import {Transform} from 'class-transformer';
import {IsString, IsBoolean, IsNumber} from 'class-validator';
import {toBoolean, toNumber} from '../../utils/transform';


export class SquashDto {

    @Transform(toNumber)
    @IsNumber()
    readonly resizeWidth: number;

    @Transform(toNumber)
    @IsNumber()
    readonly resizeHeight?: number;

    @Transform(toNumber)
    @IsNumber()
    readonly quality: number;

    @Transform(toBoolean)
    @IsBoolean()
    readonly ignoreOverflowSize: boolean;

    @IsString()
    readonly extname: string;
}
