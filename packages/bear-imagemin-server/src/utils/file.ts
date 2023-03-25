import {extname} from 'path';
import {tmpPath} from 'src/config';


/**
 * MulterModule / diskStorage / fileFilter
 * @param req
 * @param file
 * @param callback
 */
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(webp|jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

/**
 * MulterModule / diskStorage / filename
 * @param req
 * @param file
 * @param callback
 */
export const modifyFileName = (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
};



/**
 * MulterModule / diskStorage / destination
 * @param req
 * @param file
 * @param callback
 */
export const getTmpPath = (req, file, callback) => {
    callback(null, tmpPath);
};
