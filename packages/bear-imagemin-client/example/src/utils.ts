import {ErrorRequestHandler} from 'express';
import {Server} from 'http';


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

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
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



export const handleUncaughtExceptionOrRejection = (err: Error, server: Server) => {
    console.log('======Uncaughted Exception or Unhandled Rejection happens!====')
    // 記錄錯誤下來，等到所有其他服務處理完成，然後停掉當前進程。
    console.log('err', err);
    server.close(() => {
        process.exit(1)
    });
}