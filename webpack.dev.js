//生产环境的配置
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common");
module.exports = merge(baseConfig, {
    mode: "development",//开发坏境
    devtool: "inline-source-map"
});