import losslessSquash from '../losslessSquash';
import {promises as fsPromises} from 'node:fs';
import path from 'node:path';


describe('losslessSquash Test',  () => {


    it('should pass', async () => {
        const buffer = await fsPromises.readFile(path.join(__dirname, '../../static/fixture.jpg'));
        const newBuffer = await losslessSquash(buffer, {
            extname: 'webp',
            resize: {
                width: 250,
                ignoreOverflowSize: true,
            }
        });

        const targetFile = path.join(__dirname, '../../static/losslessSquash.webp');
        // fs.writeFileSync(targetFile, newBuffer);

        const resBuffer = await fsPromises.readFile(targetFile);

        expect(newBuffer.length).toBe(resBuffer.length);
    });
});
