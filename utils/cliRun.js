// 本文件代码内容为运行项目相关,流程如下：
// 1、判断有无公司和产品 2、检测输入产品名 3、检测输入运行环境变量名
// 本代码存在问题：运行后， 无法通过ctrl + C关闭命令行进程，需点击右上角关闭按钮关闭整个cmd命令行
// 若要开启调试模式， 请在package.json模式相对应命令里添加语句：  --inspect-brk
const fs = require('fs');
var path = require('path')
require('shelljs/global');
const readline = require('readline');
const pagesConf = require('./pagesConf.js')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let runtimeStr = 'dev'
let terminal = 'app'
let productName = ''


function readFile(fileStr = './utils/productRunConf.js') {
  var data = fs.readFileSync(fileStr);
  return JSON.parse(data.toString())
}
// 判断有没有公司
function hadCompany (keyword, mypath = './src/products') {
  const items = fs.readdirSync(mypath);
  return items.some((item) => item === keyword.split('_')[0])
}
// 判断有无产品
function hadProduct (keyword, mypath = './src/products') {
  const items = fs.readdirSync(mypath + '/' + keyword.split('_')[0]);
  return items.some((item) => item === keyword.split('_')[1])
}
// 判断终端下有没有产品
function isPass (keyword, mypath = './src/products') {
  const items = fs.readdirSync(mypath + '/' + keyword.split('_')[0] + '/' + keyword.split('_')[1]);
  return items.some((item) => item === terminal)
}
// 环境输入检测
function checkRuntime (runtime) {
  if (runtime !== 'beta' && runtime !== 'dev' && runtime !== 'prod') {
    console.log('输入的环境有误， 系统默认以dev环境运行')
    runtime = 'dev'
  }
  runtimeStr = runtime
  return runtime
}
// 终端检测
function checkTerminal (type) {
  if (type !== 'app' && type !== 'wap') {
    console.log('输入的终端类型有误, 默认以app端运行')
    type = 'app'
  }
  terminal = type
  return type
}

// 设置运行产品配置，包含（产品名、终端、环境）
function setProductRunConf (product) {
  let data = `module.exports = {
    productName: '${product}',
    terminal: '${terminal}',
    runtime: '${runtimeStr}'
  }`
  fs.writeFileSync('./utils/productRunConf.js', data);
}
// 设置运行npm命令
function setNpmCmd (runtime) {
  let runtimeObj = {
    dev: 'development',
    prod: 'product',
    beta: 'beta'
  }
  let json = readFile('./package.json')
  let obj = {}
  obj.auto = `vue-cli-service serve --mode ${runtimeObj[runtime]}`
  json.scripts = { ...json.scripts,
    ...obj
  }
  fs.writeFileSync('./package.json', JSON.stringify(json, null, 2));
}

rl.question('请输入要运行的产品， 如huagui_damai  ', (product) => {
  if (!(hadCompany(product) && hadProduct(product))) {
    console.log('输入的产品有误， 请核对后重新操作')
    rl.close()
    return
  }
  productName = product
  rl.question('请输入要运行的环境: dev or prod or beta  ', (runtime) => {
    runtime = checkRuntime(runtime)
    rl.question('请输入要运行的终端: app or wap  ', (type) => {
      checkTerminal(type)
      setProductRunConf(product)
      setNpmCmd(runtime)
      exec("npm run auto");
    })
  });
});
