const path = require('node:path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].js',
    clean: true,
  },
  plugins: [
      new htmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, './src/index.html'),
      }),
      new htmlWebpackPlugin({
        filename: "login.html",
        template: './src/login.html'
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // dependency: { not: ['url'] }, // 从 asset loader 中排除来自新 URL 处理的 asset
        type: "asset",
        // type: "asset/resource",
        parser: { // 用 module.parser 在一个地方配置所有解析器的选项
          dataUrlCondition: {
            maxSize: 8 * 1024,
          }
        },
        generator: {
          filename: 'images/[name].[hash:6].[ext]',
        }
      }
    ]
  }
}
