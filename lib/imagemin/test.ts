import imagemin from './index';

// $ ts-node lib/imagemin/test.ts
imagemin({sourceFile: './example/imagemin/sourcepng.png', saveFile: './example/imagemin/sourcepng_min.png'});
// imagemin({sourceFile: './example/imagemin/sourcejpg.jpg', saveFile: './example/imagemin/sourcejpg_min.jpg'});
