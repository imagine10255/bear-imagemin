import express from 'express';
import fileUpload from 'express-fileupload';

import lossySquash from './lossySquash';


const app = express();
app.use(fileUpload());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/lossySquash', async function(req, res) {


    // @ts-ignore
    const buff = req.files?.sourceFile?.data;
    const resizeWidth = req.body?.resizeWidth;
    const resizeHeight = req.body?.resizeHeight;
    const reqQuality = req.body?.quality;
    const ignoreOverflowSize = req.body?.ignoreOverflowSize;
    const isDebug = req.body?.isDebug;



    let width = undefined;
    let height = undefined;
    let quality = undefined;
    if(resizeWidth !== undefined && resizeWidth !== ''){
        width = Number(resizeWidth);

        if(width <= 0){
            res.status(400).json({
                message: 'resizeWidth need > 0',
            });
            return;
        }


    }
    if(resizeHeight !== undefined && resizeHeight !== ''){
        height = Number(resizeHeight);

        if(height <= 0){
            res.status(400).json({
                message: 'resizeHeight need > 0',
            });
            return;
        }

    }

    if(reqQuality !== undefined && reqQuality !== ''){

        quality = Number(reqQuality);
        if(!(quality >= 10 && quality <= 100)){
            res.status(400).json({
                message: 'quality need 10 ~ 100',
            });
            return;
        }
    }

    if(!buff){
        res.status(400).json({
            message: 'sourceFile miss',
        });
        return;
    }


    const params = {
        quality: quality,
        resize: {width, height, ignoreOverflowSize}
    };

    if(isDebug) console.log('params', params);

    const newBuff  = await lossySquash(buff, params);

    const fileName = 'image';
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename=' + `${fileName}.png`,
    });
    res.end(newBuff);

});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});