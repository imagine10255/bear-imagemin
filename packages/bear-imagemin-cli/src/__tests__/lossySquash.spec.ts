import {spawn} from 'child_process';
import path from 'path';
import fs from 'fs';

describe('lossySquash', () => {
    const cli = path.join(__dirname, '../../dist/bin/cli.js');
    const filePath = path.join(__dirname, '../../static/fixture.jpg');
    const targetFile = path.join(__dirname, '../../static/output_lossySquash.webp');

    const timeout = 30 * 1000;
    afterAll(async () => {
        // 測試結束後 刪除圖片
        const existsFile = await fs.existsSync(targetFile);
        if(existsFile){
            await fs.rmSync(targetFile);
        }

    }, timeout);

    it('should output"', (done) => {

        const cmd = spawn('node', [
            cli,
            'lossySquash',
            '-s', filePath,
            '-t', targetFile,
            '-w', '250',
            '-q', '90',
        ]);


        let output = '';
        cmd.stdout.on('data', (data) => {
            output += data.toString();
        });

        cmd.on('close', async (code) => {
            try {
                expect(code).toBe(0);
                expect(output).toContain(`Save to ${targetFile}`);

                const existsFile = await fs.existsSync(targetFile);
                expect(existsFile).toBe(true);

                done();
            } catch (error) {
                done(error);
            }

        });

    }, timeout);

});
