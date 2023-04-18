const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
  entry: {
    popup: path.resolve(__dirname, 'src/popup', 'popup.tsx'),
    options: path.resolve(__dirname, 'src/options', 'options.tsx'),
    background: path.resolve(__dirname, 'src/background', 'background.ts'),
    contentScript: path.resolve(__dirname, 'src/contentScript', 'contentScript.ts'),
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
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
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