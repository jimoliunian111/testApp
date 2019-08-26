const pagesConf = require('./utils/pagesConf.js')

let page = {}
let outputDir = 'dist'
let projectname = process.argv[3] // 获取build后面的参数确定执行哪个文件, build的时候才用到
let productRunConf = require('./utils/productRunConf.js')

if (process.argv[2] === 'serve') { // 运行
  let name = productRunConf.productName
  let terminal = productRunConf.terminal
  page[name] = (pagesConf[name])[terminal]
  outputDir = 'dist/' + name.split('_')[0] + '/' + name.split('_')[1] + '/' + terminal
} else if (process.argv[2] === 'build') { // 打包
  let runTime = process.argv[4]
  page[projectname] = (pagesConf[projectname])[runTime]
  outputDir = 'dist/' + projectname.split('_')[0] + '/' + projectname.split('_')[1] + '/' + runTime
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
