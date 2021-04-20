const path = require('path');
const chalk = require('chalk');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
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
    popup: resolve('../src/pages/popup/index.tsx'),
    options: resolve('../src/pages/options/index.tsx'),
    mindmap: resolve('../src/pages/mindmap/index.ts'),
    background: resolve('../src/background/index.ts'),
    content_scripts: resolve('../src/content_scripts/index.ts')
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
              configFile: resolve('../tsconfig.json'),
              transpileOnly: true,
              compilerOptions: {
                module: 'es2015'
              },
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  style: true,
                  libraryName: 'antd',
                  libraryDirectory: 'lib'
                })]
              })
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
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#25b864',
                  'link-color': '#25b864'
                },
                javascriptEnabled: true
              }
            }
          }
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
  stats: 'errors-warnings',
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanAfterEveryBuildPatterns: [
        resolve('../dist/content_scripts.css')
      ]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
      template: resolve('../public/popup.html'),
      favicon: resolve('../src/images/yuque_32.png')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['options'],
      filename: 'options.html',
      template: resolve('../public/options.html'),
      favicon: resolve('../src/images/yuque_32.png')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['mindmap'],
      filename: 'mindmap.html',
      template: resolve('../public/mindmap.html'),
      favicon: resolve('../src/images/yuque_32.png')
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
        { from: resolve('../src/manifest.json'), to: resolve('../dist'), toType: 'dir' },
        { from: resolve('../src/player.css'), to: resolve('../dist'), toType: 'dir' },
        { from: resolve('../src/images'), to: resolve('../dist/images'), toType: 'dir' },
        { from: resolve('../src/vendors'), to: resolve('../dist/vendors'), toType: 'dir' }
      ]
    })
  ]
};
