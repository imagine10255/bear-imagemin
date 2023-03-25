import BearImageminClient from './BearImageminClient';
import { join } from 'path';

const imageAp = new BearImageminClient('http://localhost:3001');

const filePath = join(__dirname, '../example/static/sample.png');
const toPath = join(__dirname, '../example/static/sample_convert.png');

new Promise(async () => {

    console.log('toPath',filePath);
    try {
        const data = await imageAp.squash(filePath, toPath, {resize: {width: 100}});
        console.log('success!', data);

    } catch (e) {
        console.log('try error', e);
        return;
    }
})
