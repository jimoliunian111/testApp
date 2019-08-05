const pagesConf = require('./utils/pagesConf.js')

let page = {}
let outputDir = 'dist'
let projectname = process.argv[3] // 获取build后面的参数确定执行哪个文件
let productName = require('./utils/productName.js').productName
console.log('aaa1,', productName)
if (process.env.NODE_ENV !== 'product') { // 'development'
  page[productName] = pagesConf[productName]
  outputDir = 'dist/' + projectname.split('_')[0] + '/' + projectname.split('_')[1]
} else {
  page[projectname] = pagesConf[projectname]
  outputDir = 'dist/' + projectname.split('_')[0] + '/' + projectname.split('_')[1]
}
module.exports = {
  publicPath: './',
  outputDir: outputDir,
  pages: page,
  lintOnSave: 'error',

  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,

  // 如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
  filenameHashing: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: ''
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 12
          })
        ]
      }
    }
  }
}
