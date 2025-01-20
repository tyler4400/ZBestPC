const path = require('node:path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    index: './src/index.js',
    login: './src/login.js',
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
        chunks: ["index"],
      }),
      new htmlWebpackPlugin({
        filename: "login.html",
        template: './src/login.html',
        chunks: ["login"],
      }),
    /**
     * 对于import 'jquery'; 这种库，引入之后会在window上挂载变量的
     * 需要用下面这种方式提供一个全局变量
     */
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      }),
    /* 移动文件 */
      new CopyPlugin({
        patterns: [{ from: path.resolve(__dirname, './src/img'), to: path.resolve(__dirname, 'dist/img') }],
      }),
    /* 对css进行抽离 */
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash:8].css",
        chunkFilename: "css/[name].[hash:8].css",
      }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // dependency: { not: ['url'] }, // 从 asset loader 中排除来自新 URL 处理的 asset
        type: "asset",
        // type: "asset/resource",
        parser: { // 用 module.parser 在一个地方配置所有解析器的选项
          dataUrlCondition: {
            maxSize: 1024,
          }
        },
        generator: {
          filename: 'images/[name].[hash:6].[ext]',
        }
      }
    ]
  },
  /* 优化 */
  optimization: {
    // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。
    minimize: true,
    // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)
    minimizer: [
        new TerserPlugin({
          parallel: true, // 多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1 。
          // include: /\src/,
        }),
        // 压缩css
        new CssMinimizerPlugin()
    ]
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    // compress: true,
    port: 8080,
    hot: true,
    // quiet: true,
    watchFiles: ['./src/**/*.html']
  }
}
