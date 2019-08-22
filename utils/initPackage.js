// 若要开启调试模式， 请在package.json模式相对应命令里添加语句：  --inspect-brk
const fs = require('fs');
var path = require('path')
require('shelljs/global');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function getAllDirs(mypath = './src/products') {
  const items = fs.readdirSync(mypath);
  let result = [];
  items.map(item => { // 遍历当前目录中所有的文件和文件夹
    let temp = path.join(mypath, item);
    // 若当前的为文件夹
    if(fs.statSync(temp).isDirectory()) {
      result.push(item); // 存储当前文件夹的名字
      // result = result.concat( getAllDirs( temp ) ); // 进入下一级文件夹访问
    }
  });
  return setProductsArr(result, mypath)
  //  return result;
}

function setProductsArr(arr, mypath = './src/products') {
  let productsConf = []
  arr.map(company => { // 遍历传进来的数组，即products目录下的公司名数组
    const products = fs.readdirSync(mypath + '/' + company); // 获取每个公司名下的所有产品名数组
    products.map(product => { // 遍历每个公司名下的所有产品名
      let temp = path.join(mypath + '/' + company, product); // 由公司名加产品名组成新的地址字符串
      if(fs.statSync(temp).isDirectory()) { // 判断由公司名加产品名组成新的地址字符串是否是文件夹
        let str = company + '_' + product
        productsConf.push(str)
      } else {
        console.log('目录结构不正确')
      }
    })
  })
  return readFile(productsConf)
  //	return productsConf;
}

function readFile(confs, fileStr = './package.json') {
  var data = fs.readFileSync(fileStr);
  return writeFile(confs, JSON.parse(data.toString()), fileStr)
  //	return JSON.parse(data.toString())
}

function writeFile(arr, data, fileStr) {
  rl.question('请输入环境，如development  ', (answer) => {
    let obj = {}
    obj['build:all'] = arr.map(item => 'npm run build:' + item).join(' & ')
    arr.map(item => {
      obj['build:' + item] = 'vue-cli-service build ' + item + ' --mode ' + answer
    })
    data.scripts = { ...data.scripts,
      ...obj
    }
    fs.writeFileSync(fileStr, JSON.stringify(data, null, 2));
    console.log('package.json文件设置成功')
    rl.question('请输入打包产品名，如huagui_damai  ', (answer) => {
      console.log(`正在打包中...：${answer}`);
      exec("npm run build:" + answer);
      rl.close();
    });
  });
}
getAllDirs()
