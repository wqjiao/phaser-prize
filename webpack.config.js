const path = require('path');

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:8085/',
    './src/app.js',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "http://localhost:8085/",
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    quiet: false, //控制台中不输出打包的信息
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    progress: true, //显示打包的进度
    watchOptions: {
        aggregateTimeout: 300
    },
    port: '8085'
  }
};
