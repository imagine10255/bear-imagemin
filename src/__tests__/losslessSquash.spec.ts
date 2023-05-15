import losslessSquash from '../losslessSquash';
import {promises as fsPromises} from 'node:fs';
import path from 'node:path';


describe('losslessSquash Test',  () => {


    it('should pass', async () => {
        const sourcePath = path.join(__dirname, '../../static/fixture.jpg');
        const newBuffer = await losslessSquash(sourcePath, {
            extname: 'webp',
            resize: {
                width: 250,
                ignoreOverflowSize: true,
            }
        });

        const targetFile = path.join(__dirname, '../../static/losslessSquash_.webp');
        // fsPromises.writeFile(targetFile, newBuffer);

        const resBuffer = await fsPromises.readFile(targetFile);

        expect(newBuffer.length).toBe(resBuffer.length);
    });
});
