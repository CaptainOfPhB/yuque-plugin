const path = require('path');
const chalk = require('chalk');
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const resolve = relativePath => path.resolve(__dirname, relativePath);

const messages = `Build success, now you can follow the steps below:

      1. Open Chrome extensions page (${chalk.green.underline('chrome://extensions')})
      2. Open ${chalk.green('developer mode')} on upper right conner
      3. Click the ${chalk.green('load unpacked')} button in the upper left conner
      4. Select the ${chalk.green('dist')} dir under this project
      5. After you edit code, just click ${chalk.green('reload')} icon on Yuque extension card
`;

module.exports = {
  mode: 'development',
  entry: {
    main: resolve('../src/index.tsx'),
    background: resolve('../src/background/index.ts'),
    content_scripts: resolve('../src/content_scripts/index.ts')
  },
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
  stats: 'errors-only',
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      template: resolve('../public/index.html')
    }),
    new MiniCssExtractPlugin(),
    new EslintPlugin({
      failOnWarning: true,
      extensions: ['js', 'ts', 'tsx']
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [messages]
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve('../manifest.json'), to: resolve('../dist'), toType: 'dir' },
        { from: resolve('../src/images'), to: resolve('../dist/images'), toType: 'dir' },
        { from: resolve('../src/vendors'), to: resolve('../dist/vendors'), toType: 'dir' }
      ]
    })
  ]
};
