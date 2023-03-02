const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
let plugins = [];

plugins.push(
  new HtmlWebpackPlugin({
    hash: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true,
    },
    filename: 'index.html',
    template: __dirname + '/main.html',
  })
);
module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(path.join(__dirname, 'dist')),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        generator: {
          filename: 'bundle.css',
        },
        use: [
          'style-loader',
          'css-loader',

          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: () => [require('autoprefixer')],
          //     },
          //   },
          // },
          'sass-loader',
        ],
      },
    ],
  },
  plugins,
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    concatenateModules: false,
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },
};
