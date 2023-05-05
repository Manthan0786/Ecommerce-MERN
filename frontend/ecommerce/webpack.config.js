const path = require('path');

module.exports = {
  entry: './test/test.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};