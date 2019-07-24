module.exports = {
  "huagui_damai": {
    "entry": "src/products/huagui/damai/main.js",
    "template": "src/public/index.html",
    "filename": "index.html",
    "chunks": ["chunk-vendors", "chunk-common", "huagui_damai"]
  },
  "huagui_xiaomai": {
    "entry": "src/products/huagui/xiaomai/main.js",
    "template": "src/public/index.html",
    "filename": "index.html",
    "chunks": ["chunk-vendors", "chunk-common", "huagui_xiaomai"]
  },
  "qixin_xinai": {
    "entry": "src/products/qixin/xinai/main.js",
    "template": "src/public/index.html",
    "filename": "index.html",
    "chunks": ["chunk-vendors", "chunk-common", "qixin_xinai"]
  }
}
