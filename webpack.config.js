var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    '2_polyfills': './src/polyfills.ts',
    '1_vendor': './src/vendor.ts',
    '0_app': './src/main.ts'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(html|css)$/,
        loaders: ['raw']
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template:'src/index.html',
      inject: 'body'
    })
  ]
};
