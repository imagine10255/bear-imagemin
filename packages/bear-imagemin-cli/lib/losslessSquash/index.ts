import * as fs from 'fs';
import logger from '../script/logger';
import {bash} from '../script/utils';
import {losslessSquash} from 'bear-node-imagemin';


interface IArgs {
    sourceFile: string,
    saveFile: string,
    width?: number,
    height?: number,
}


async function run(args: IArgs) {
    const {sourceFile, saveFile, width, height} = args;
    const bufferData = fs.readFileSync(sourceFile);

    const res = await losslessSquash(bufferData, {
        resize: {width, height}
    });

    fs.writeFileSync(saveFile, res);

    logger.success(`Save to ${saveFile}`);


    // By OSX Notice
    bash(`osascript -e 'display notification "${saveFile} done" with title "publish done"'`);
}

export default run;
module.exports = run;