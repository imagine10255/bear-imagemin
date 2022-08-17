import * as fs from 'fs';
import path from 'path';
import logger from '../script/logger';
import {bash} from '../script/utils';
import {regPattern} from 'bear-jsutils/equal';
import {removeStartEnd} from 'bear-jsutils/string';
import {squashPNG} from 'bear-node-imagemin-core';
import sharp from 'sharp';
import {ISquashReturnRes} from '../../packages/bear-node-imagemin-core';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import lossySquash from '../../src/lossySquash';

// const imageminMozjpeg = require('imagemin-mozjpeg');


interface IArgs {
    sourceFile: string,
    saveFile: string,
    quality?: string,
}


async function run(args: IArgs) {
    // const basePath = typeof args.filePath !== 'undefined' ? args.filePath: './';
    // const sourceDirPath = path.join(basePath, '_sources');
    // if (!fs.existsSync(sourceDirPath)){
    //     fs.mkdirSync(sourceDirPath, {recursive: true});
    // }
    const {sourceFile, saveFile} = args;
    const extname = path.extname(sourceFile);

    const inputBuffer = fs.readFileSync(sourceFile);

    const resizeBuffer = await sharp(inputBuffer)
        .resize(1024)
        .toBuffer();


    // 壓縮 png
    let res: ISquashReturnRes;
    // if(extname === '.png'){
    //     res = squashPNG(resizeBuffer, {
    //         quality: '100',
    //     });
    // }else{
    // 壓縮 jpg
    // res = squashJPG(resizeBuffer, {
    //     quality: 0.8,
    // });

    // const MyRes = await imagemin([sourceFile], {
    //     plugins: [
    //         imageminMozjpeg(),
    //         imageminPngquant()
    //     ]
    // });
    //
    // const oneRes = MyRes[0];
    // fs.writeFileSync(saveFile, oneRes.data);


    const MyRes = await lossySquash(sourceFile, {
        quality: .8
    });

    const oneRes = MyRes;
    fs.writeFileSync(saveFile, oneRes.data);



    // }

    // fs.writeFileSync(saveFile, resizeBuffer);

    logger.success(`Save to ${saveFile}`);


    // By OSX Notice
    bash(`osascript -e 'display notification "${saveFile} done" with title "publish done"'`);
}

export default run;
module.exports = run;