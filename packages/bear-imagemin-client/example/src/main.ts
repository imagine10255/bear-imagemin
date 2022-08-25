import {BearImageminClient} from 'bear-imagemin-client';
import { join } from 'path';

const imageAp = new BearImageminClient('http://localhost:3001');

const filePath = join(__dirname, '../../../../example/static/source.png');
const toPath = join(__dirname, '../../../../example/static/lossySquash/test_1.png');

new Promise(async () => {

    try {
        await imageAp.squash(filePath, toPath, {resize: {width: 100}});

    } catch (e) {
        console.log('try error', e);
        return;
    }
}