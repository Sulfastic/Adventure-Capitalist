const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?modules'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      {from: 'assets', to: 'assets'},
    ]),
    new CopyWebpackPlugin([
      {from: 'sounds', to: 'sounds'},
    ]),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: /node_modules/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
};
