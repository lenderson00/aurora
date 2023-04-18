const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');


const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: false,
  },
  entry: {
    popup: path.resolve(__dirname, 'src/popup', 'popup.tsx'),
    options: path.resolve(__dirname, 'src/options', 'options.tsx'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'static'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    ...getHTMLPlugins([
      'popup',
      'options',
    ])

  ],
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
          // A opção abaixo desativa a geração de 'eval'
          // no código minimizado
          parse: {
            bare_returns: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}

function getHTMLPlugins (chunks) {
  return chunks.map(chunk => {
    return new HTMLPlugin({
      title: chunk,
      filename: `${chunk}.html`,
      chunks: [chunk]
    })
  })
}