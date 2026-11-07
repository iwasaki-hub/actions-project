// 「ビルド成果物」を作るだけのダミースクリプト（artifact の練習用）
const fs = require('fs');
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('src/calc.js', 'dist/calc.js');
fs.writeFileSync('dist/build-info.txt', `built at ${new Date().toISOString()}\n`);
console.log('dist/ を作成しました');
