import {lossySquash} from 'bear-node-imagemin';
import {logger} from './logger';
import {ILossySquashArgs} from './types';
import fs from 'fs';

export async function run(args: ILossySquashArgs) {
    const { sourceFile, saveFile, quality, width, height, ignoreOverflowSize } = args;

    try {
        const bufferData = fs.readFileSync(sourceFile);
        const res = await lossySquash(bufferData, {
            resize: {
                width: width ? Number(width): undefined,
                height: height ? Number(height): undefined,
                ignoreOverflowSize
            },
            quality: quality ? Number(quality): undefined,
        });
        await fs.writeFileSync(saveFile, res);
        logger.success(`Save to ${saveFile}`);

    } catch (e) {
        if(e instanceof Error){
            logger.error(e.message);
        }
    }
}
