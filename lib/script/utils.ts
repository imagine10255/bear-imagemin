import {execSync} from 'child_process';
import * as fs from 'fs';
const options = {stdio:[0, 1, 2]};

export const bash = (cmd: string) => {
    execSync(cmd, options);
};

/**
 * 保留小數第二位
 * @returns {string}
 * @param num
 */
const numToDecimal2 = (num: number): number => {
    const f = Math.floor(num * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return Number(s);
};


export const getFilesizeInBytes = (filename: string): string => {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return `${numToDecimal2(fileSizeInBytes / 1024)} kB`;
};

const onlyUnique = (value: string, index: number, self: string[]): boolean => {
    return self.indexOf(value) === index;
};
