const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');


const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
          sourceMap: true,
          parse: {
            bare_returns: true,
          },
        },
      }),
    ],
  },
});