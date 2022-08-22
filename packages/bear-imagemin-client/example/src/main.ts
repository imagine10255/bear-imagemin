import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import {BearImageminClient} from 'bear-imagemin-client';
import {handleError, handleUncaughtExceptionOrRejection} from './utils';
import { join } from 'path';


const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(handleError);


app.get('/', async function(req, res) {
    const imageAp = new BearImageminClient('http://localhost:3001');

    const filePath = join(__dirname, '../../../../example/static/source.png');
    const toPath = join(__dirname, '../../../../example/static/lossySquash/test_1.png');

    try {
        await imageAp.squash(filePath,toPath, {resize: {width: 100}});

    }catch (e) {
        console.log('try error', e);
        res.status(500).json(e);
        return;
    }

    res.send(`squash ok!: ${filePath} => ${toPath}`);
});


const server = app.listen(3000, function() {
    console.log('imagemin app listening on port 3000!');
});

process.on('unhandledRejection', (err: any) => handleUncaughtExceptionOrRejection(err, server));
process.on('uncaughtException', (err) => handleUncaughtExceptionOrRejection(err, server))
