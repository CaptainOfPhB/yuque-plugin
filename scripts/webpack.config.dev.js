const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  mode: 'production',
  entry: resolvePath('../src/index.tsx'),
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
  resolve: { extensions: ['.tsx', '.ts'] }
  // plugins: [
  //   new CleanWebpackPlugin({
  //     cleanAfterEveryBuildPatterns: [
  //       resolvePath('../lib/video.d.ts'),
  //       resolvePath('../lib/utils.d.ts')
  //     ]
  //   })
  // ]
};
