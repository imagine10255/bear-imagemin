import lossySquash from '../lossySquash';
import {promises as fsPromises} from 'node:fs';
import path from 'node:path';


describe('lossySquash Test',  () => {


    it('should pass', async () => {
        const buffer = await fsPromises.readFile(path.join(__dirname, '../../static/fixture.jpg'));
        const newBuffer = await lossySquash(buffer, {
            extname: 'webp',
            quality: 90,
            resize: {
                width: 250,
                ignoreOverflowSize: true,
            }
        });

        const targetFile = path.join(__dirname, '../../static/lossySquash.webp');
        // fs.writeFileSync(targetFile, newBuffer);

        const resBuffer = await fsPromises.readFile(targetFile);

        expect(newBuffer.length).toBe(resBuffer.length);
    });
});
