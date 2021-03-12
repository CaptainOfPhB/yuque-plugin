const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  mode: 'production',
  entry: resolve('../src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.ts$/,
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
  optimization: {
    usedExports: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve('../src')
    }
  }
  // plugins: [
  //   new CleanWebpackPlugin({
  //     cleanAfterEveryBuildPatterns: [
  //       resolvePath('../lib/video.d.ts'),
  //       resolvePath('../lib/helper.d.ts')
  //     ]
  //   })
  // ]
};
