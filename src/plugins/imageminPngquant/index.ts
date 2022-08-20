const pngquant = require('./vendor/pngquant.min');


const index = (options?: { quality?: number }) => (input: Buffer): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        try {
            const _options = {
                quality: `0-${((options?.quality ?? 100) / 10)}`,
            };
            const res = pngquant(input, _options, () => {}).data;
            resolve(res);
        }catch (err: any){
            throw Error(err.message);
        }
    });
};

export default index;