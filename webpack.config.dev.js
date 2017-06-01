var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = [{
  entry: {
    "bundle": './src/index.tsx',
  },
  output: {
    filename: './dist/[name].js',
  },
  node: {
  __dirname: false,
  __filename: false,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader' }
        ]
      }
    ]
  },
},
{
  entry: {
    "main": './main.ts',
  },
  output: {
    filename: './[name].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  node: {
  __dirname: false,
  __filename: false,
},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader' }
        ]
      }
    ]
  },
  target: 'electron-main'
}
];