const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  filename: '../template.html',
  template: './src/template.html',
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const copyPlugin = new CopyPlugin({
  patterns: [
    { from: './src/public', to: './' },
  ],
  options: {
    concurrency: 100,
  },
});

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build', 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]',
              },
            },
          },
        ],
        include: /[A-Z].+?\.css$/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
        exclude: /[A-Z].+?\.css$/,
      },
    ],
  },
  plugins: [htmlPlugin, cssPlugin, copyPlugin],
};
