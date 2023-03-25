import {losslessSquash} from 'bear-node-imagemin';
import {logger} from './logger';
import { ILosslessSquashArgs } from './types';
import fs from 'fs';

export async function run(args: ILosslessSquashArgs) {
    const { sourceFile, saveFile, width, height, ignoreOverflowSize } = args;

    try {
        const bufferData = fs.readFileSync(sourceFile);
        const res = await losslessSquash(bufferData, {
            resize: {
                width: width ? Number(width): undefined,
                height: height ? Number(height): undefined,
                ignoreOverflowSize
            }
        });
        await fs.writeFileSync(saveFile, res);
        logger.success(`Save to ${saveFile}`);

    } catch (e) {
        if(e instanceof Error){
            logger.error(e.message);
        }
    }
}
