import fs from 'fs';

const content = fs.readFileSync('data.txt', 'utf-8');

console.log(content);