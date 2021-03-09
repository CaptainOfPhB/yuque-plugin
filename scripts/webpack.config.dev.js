const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  mode: 'development',
  entry: resolvePath('../src/index.ts'),
  output: {
    library: 'AHSVideo',
    libraryExport: 'default',
    filename: 'ahs-video.min.js',
    path: resolvePath('../dev')
  },
  watch: true,
  watchOptions: {
    ignored: ['node_modules/**', 'dev/**', 'scripts/**', 'lib/**']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolvePath('../tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
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
          { loader: 'url-loader' }
        ]
      }
    ]
  },
  resolve: { extensions: ['.ts'] },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'blocking',
      template: resolvePath('../public/index.html')
    })
  ]
};
