import express,{ErrorRequestHandler} from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import {lossySquash, losslessSquash} from 'bear-node-imagemin';

interface IContentTypeMap {
    [types: string]: string,
}

const contentTypeMap: IContentTypeMap = {
    jpg: 'image/jpg',
    png: 'image/png',
    webp: 'image/webp',
};


export class CustomError {
    message!: string;
    status!: number;
    additionalInfo!: any;

    constructor(message: string, status: number = 500, additionalInfo: any = {}) {
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo
    }
}

const handleError: ErrorRequestHandler = (err, req, res, next) => {
    let customError = err;

    if (!(err instanceof CustomError)) {
        customError = new CustomError(
            'Oh no, this is embarrasing. We are having troubles my friend',
            500,
            err
        );
    }

    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    res.status((customError as CustomError).status).send(customError);
};


const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// not crashes when error is detected
process.on('uncaughtException', err => {})

app.get('/', function(req, res) {
    res.send('bear-imagemin-api! (ex: /api/losslessSquash or /api/lossySquash)');
});



/**
 * 壓縮
 * 有設定 品質則會是有損壓縮, 預設為無損
 */
app.post('/api/squash', async function(req, res, next) {

    // @ts-ignore
    const buff = req.files?.sourceFile?.data;
    const resizeWidth = req.body?.resizeWidth;
    const resizeHeight = req.body?.resizeHeight;
    const reqQuality = req.body?.quality;
    const ignoreOverflowSize = req.body?.ignoreOverflowSize;
    const extname = (req.body?.extname ?? '.webp').replace('.','')
        .replace('jpeg','jpg');
    let isLossLess = true;



    let width = undefined;
    let height = undefined;
    let quality = undefined;
    if(resizeWidth !== undefined && resizeWidth !== ''){
        width = Number(resizeWidth);

        if(Number.isNaN(width) ||width <= 0){
            res.status(400).json({
                message: 'resizeWidth need > 0',
            });
            return;
        }


    }
    if(resizeHeight !== undefined && resizeHeight !== ''){
        height = Number(resizeHeight);

        if(Number.isNaN(height) || height <= 0){
            res.status(400).json({
                message: 'resizeHeight need > 0',
            });
            return;
        }

    }

    if(reqQuality !== undefined && reqQuality !== ''){

        quality = Number(reqQuality);
        if(Number.isNaN(quality) || !(quality >= 10 && quality <= 100)){
            res.status(400).json({
                message: 'quality need 10 ~ 100',
            });
            return;
        }else if(reqQuality < 99){
            isLossLess = false;
        }
    }


    if(!Object.keys(contentTypeMap).includes(extname)){
        res.status(400).json({
            message: 'extname only .jpg, .png, .webp',
        });
        return;
    }

    if(!buff){
        res.status(400).json({
            message: 'sourceFile miss',
        });
        return;
    }


    const params = {
        quality: isLossLess ? undefined: quality,
        resize: {width, height, ignoreOverflowSize},
        extname,
    };

    console.log('squash', JSON.stringify(params));

    // 品質低於100 或是無設定為 無損
    const newBuff = isLossLess ?
        await losslessSquash(buff, params):
        await lossySquash(buff, params);

    const contentType = contentTypeMap[extname];
    res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename=' + `image.${extname}`,
    });
    res.end(newBuff);

});


app.use(handleError);

app.listen(3000, function() {
    console.log('imagemin app listening on port 3000!');
});