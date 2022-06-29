//开发坏境和生产坏境的公共配置
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        index: "./src/index.js",
    },
    module: {
        rules: [
            {
                test: /css$/i,//匹配css、scss文件
                use: ["style-loader", "css-loader", "sass-loader"]//从后往前执行
            },
            {
                test: /.(png|jpg|jpeg|svg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options:  {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};