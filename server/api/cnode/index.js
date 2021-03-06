const proxy = require("http-proxy-middleware")
const url = require('url')
const {BASE_URL} = require('../../config').cnode
/**
 * 转发cnode 的API
 * @type {[type]}
 */
module.exports = proxy({
  target: BASE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/cnode': ''   // 替换前缀
  }
})
