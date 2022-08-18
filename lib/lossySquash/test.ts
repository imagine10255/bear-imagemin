import lossySquash from './index';

// $ ts-node lib/lossySquash/test.ts
lossySquash({sourceFile: './example/source.png', saveFile: './example/lossySquash/image.png', quality: .8});
