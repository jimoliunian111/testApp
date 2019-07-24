const fs = require('fs');
var path = require('path')
require('shelljs/global');
const readline = require('readline');
const pagesConf = require('./pagesConf.js')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function readFile(fileStr = './utils/productName.js') {
  var data = fs.readFileSync(fileStr);
  return JSON.parse(data.toString())
}
rl.question('请输入要运行的产品， 如huagui_damai  ', (product) => {
  rl.question('请输入要运行的环境， 默认（development）  ', (runtime) => {
    let data = `module.exports = {
  productName: '${product}'
}`
    fs.writeFileSync('./utils/productName.js', data);
    exec("npm run serve");
    rl.close()
  });
});
