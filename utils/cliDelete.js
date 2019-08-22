const fs = require('fs');
var path = require('path')
require('shelljs/global');
const readline = require('readline');
const pagesConf = require('./pagesConf.js')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 若要开启调试模式， 请在package.json模式相对应命令里添加语句：  --inspect-brk

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
// 删除方法   node只能删除文件和删除非空文件夹， 所以需要遍历删除
function deleteall(path, type, keyword) {
  console.log('删除的路径', path, fs.readdirSync(path))
  let files = [];
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteall(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
    deleteProductConf(keyword, type)
    console.log(`删除成功`);
    rl.close(keyword, type)
  }
};
// 删除产品页面配置
function deleteProductConf (keyword, type = 'product', mypath = './utils/pagesConf.js') {
  // 删除单个产品配置
  let data = ''
  if (type === 'product') {
    delete pagesConf[keyword]
    data = `module.exports = ${JSON.stringify(pagesConf, null, 2)}`
  } else {
    let obj = {}
    let arr = Object.keys(pagesConf)
    let result = arr.filter(item => item.split('_')[0] !== keyword.split('_')[0])
    result.map(key => {
      obj[key] = pagesConf[key]
    })
    data = `module.exports = ${JSON.stringify(obj, null, 2)}`
  }
  fs.writeFileSync('./utils/pagesConf.js', data)
}



rl.question('请输入要删除的公司或产品  ', (answer) => {
  console.log(`正在查询：${answer} 中...`);
  if (hadCompany(answer)) { // 查找到公司
    if (hadProduct(answer)) { // 查找到产品
      rl.question('删除公司or产品，公司：1， 产品：2 , 取消：3 ', (type) => {
        if (+type === 2) {
          console.log(`正在删除产品：${answer.split('_')[1]} 中...`);
          deleteall(`./src/products/${answer.split('_')[0]}/${answer.split('_')[1]}`, 'product', answer)
        } else if (+type === 1) {
          rl.question('删除公司会删除该公司目录下所有产品，是否删除： yes or no ', (choice) => {
            if (choice === 'yes') {
              console.log(`正在删除公司：${answer.split('_')[0]} 中...`);
              deleteall(`./src/products/${answer.split('_')[0]}`, 'company', answer)
            } else {
              rl.close()
            }
          });
        } else {
          rl.close()
        }
      });
    } else {
      console.log(`未找到产品: ${answer.split('_')[1]}! `);
      rl.close()
    }
  } else {
    console.log(`未找到公司: ${answer.split('_')[0]}! `);
    rl.close()
  }
});
