import {lossySquash, losslessSquash} from 'bear-node-imagemin';
import * as fs from 'fs';


const isLossLess = false;
const sourceFile = './static/source.png';

const params = {
    quality: isLossLess ? undefined: 80,
    resize: {width: 200, height: 200, ignoreOverflowSize: true},
    extname: '.webp',
};


new Promise(async () => {

    // file to buff
    const bufferData = fs.readFileSync(sourceFile);
    const newBuff = isLossLess ?
        await losslessSquash(bufferData, params): // is lossLess
        await lossySquash(bufferData, params); // is lossy

    fs.writeFileSync('./static/lossySquash/image_1024_2.png', newBuff);

})