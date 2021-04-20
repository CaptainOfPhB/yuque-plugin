const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  mode: 'production',
  output: {
    path: resolve('../build')
  },
  entry: {
    popup: resolve('../src/pages/popup/index.tsx'),
    options: resolve('../src/pages/options/index.tsx'),
    mindmap: resolve('../src/pages/mindmap/index.ts'),
    background: resolve('../src/background/index.ts'),
    content_scripts: resolve('../src/content_scripts/index.ts')
  },
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
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanAfterEveryBuildPatterns: [
        resolve('../build/content_scripts.css')
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
    new MiniCssExtractPlugin({
      ignoreOrder: true
    }),
    new EslintPlugin({
      failOnWarning: true,
      extensions: ['js', 'ts', 'tsx']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve('../src/manifest.json'), to: resolve('../build'), toType: 'dir' },
        { from: resolve('../src/player.css'), to: resolve('../build'), toType: 'dir' },
        { from: resolve('../src/images'), to: resolve('../build/images'), toType: 'dir' },
        { from: resolve('../src/vendors'), to: resolve('../build/vendors'), toType: 'dir' }
      ]
    }),
    new ZipPlugin({
      path: resolve('../'),
      filename: 'yuque-plugin.zip'
    })
  ]
};
