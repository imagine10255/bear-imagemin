import losslessSquash from '../losslessSquash';
import {promises as fsPromises} from 'node:fs';
import path from 'node:path';


/**
 * 測試無損壓縮
 */
describe('losslessSquash Test',  () => {
    const sourcePath = path.join(__dirname, '../../static/fixture.jpg');


    it('convert webp', async () => {
        const newBuffer = await losslessSquash(sourcePath, {
            extname: 'webp',
            resize: {
                width: 250,
                ignoreOverflowSize: true,
            }
        });

        // 儲存成檔案
        // const tmpTargetFile = path.join(__dirname, '../../static/losslessSquash_tmp.webp');
        // await fsPromises.writeFile(tmpTargetFile, newBuffer);

        // 比對 Buffer
        const targetFile = path.join(__dirname, '../../static/losslessSquash.webp');
        const resBuffer = await fsPromises.readFile(targetFile);

        expect(newBuffer.length).toBe(resBuffer.length);
    });



    it('convert png', async () => {
        const newBuffer = await losslessSquash(sourcePath, {
            extname: 'png',
            resize: {
                width: 250,
                ignoreOverflowSize: true,
            }
        });

        // 儲存成檔案
        // const tmpTargetFile = path.join(__dirname, '../../static/losslessSquash_tmp.png');
        // await fsPromises.writeFile(tmpTargetFile, newBuffer);

        // 比對 Buffer
        const targetFile = path.join(__dirname, '../../static/losslessSquash.png');
        const resBuffer = await fsPromises.readFile(targetFile);

        expect(newBuffer.length).toBe(resBuffer.length);
    });
});
