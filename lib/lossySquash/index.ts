import * as fs from 'fs';
import logger from '../script/logger';
import {bash} from '../script/utils';
import lossySquash from '../../src/lossySquash';
import path = require('path');


interface IArgs {
    sourceFile: string,
    saveFile: string,
    quality?: number,
    width?: number,
    height?: number,
}


async function run(args: IArgs) {
    const {sourceFile, saveFile, quality, width, height} = args;

    const bufferData = fs.readFileSync(sourceFile);

    const extname = path.extname(saveFile);

    const res = await lossySquash(bufferData, {
        extname,
        quality,
        resize: {width, height},
    });

    fs.writeFileSync(saveFile, res);

    logger.success(`Save to ${saveFile}`);


    // By OSX Notice
    bash(`osascript -e 'display notification "${saveFile} done" with title "publish done"'`);
}

export default run;
module.exports = run;