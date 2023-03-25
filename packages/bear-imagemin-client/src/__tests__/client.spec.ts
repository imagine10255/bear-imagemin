import BearImageminClient from '../BearImageminClient';
import { join } from 'path';

const imageAp = new BearImageminClient('http://localhost:3001');

const filePath = join(__dirname, '../example/static/sample.png');
const toPath = join(__dirname, '../example/static/sample_convert.png');

describe('BearImageminClient', () => {

    it('Input convert', async () => {

        const input = await imageAp.squash(filePath, toPath, {resize: {width: 100}});

        // 必須可編譯推斷型別無錯誤
        const equalResult = '/Users/imagine/project/packages/bear-node-imagemin/packages/bear-imagemin-client/example/static/sample_convert.png';

        expect(input).toStrictEqual(equalResult);
    });

});
