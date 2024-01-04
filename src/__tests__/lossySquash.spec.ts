import lossySquash from '../lossySquash';
import {promises as fsPromises} from 'node:fs';
import path from 'node:path';


/**
 * 測試有損壓縮
 */
describe('lossySquash Test',  () => {

    const filePath = path.join(__dirname, '../../static/fixture.jpg');

    it('convert webp', async () => {
        const newBuffer = await lossySquash(filePath, {
            extname: 'webp',
            quality: 90,
            resize: {
                width: 250,
                ignoreOverflowSize: true,
            }
        });

        // 儲存成檔案
        // const tmpTargetFile = path.join(__dirname, '../../static/lossySquash_tmp.webp');
        // await fsPromises.writeFile(tmpTargetFile, newBuffer);

        // 比對 Buffer
        const targetFile = path.join(__dirname, '../../static/lossySquash.webp');
        const resBuffer = await fsPromises.readFile(targetFile);

        expect(newBuffer.length).toBe(resBuffer.length);
    });



    it('convert png', async () => {
        const newBuffer = await lossySquash(filePath, {
            extname: 'png',
            quality: 90,
            resize: {
                width: 250,
                ignoreOverflowSize: true,
            }
        });

        // 儲存成檔案
        // const tmpTargetFile = path.join(__dirname, '../../static/lossySquash_tmp.png');
        // await fsPromises.writeFile(tmpTargetFile, newBuffer);

        // 比對 Buffer
        const targetFile = path.join(__dirname, '../../static/lossySquash.png');
        const resBuffer = await fsPromises.readFile(targetFile);

        expect(newBuffer.length).toBe(resBuffer.length);
    });
});
