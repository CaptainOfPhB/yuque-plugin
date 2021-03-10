const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const resolve = relativePath => path.resolve(__dirname, relativePath);

const messages = `Build success, now you can follow the steps below:

      1. Open Chrome extensions page (${chalk.green.underline('chrome://extensions')})
      2. Open ${chalk.green('developer mode')} on upper right conner
      3. Click the ${chalk.green('load unpacked')} button in the upper left conner 
      4. Select the ${chalk.green('dist')} dir under this project
`;

module.exports = {
  mode: 'development',
  entry: resolve('../src/index.tsx'),
  output: {
    path: resolve('../dist')
  },
  watch: true,
  watchOptions: {
    ignored: [
      'node_modules'
    ]
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve('../tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ],
    alias: {
      '@': resolve('../src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      favicon: resolve('../src/images/yuque_32.png')
    }),
    new MiniCssExtractPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [messages]
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve('../manifest.json'), to: resolve('../dist'), toType: 'dir' },
        { from: resolve('../src/images'), to: resolve('../dist/images'), toType: 'dir' }
      ]
    })
  ],
  stats: 'errors-only',
  performance: {
    hints: false
  }
};