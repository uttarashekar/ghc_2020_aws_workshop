const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/public'),
      filename: 'bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
      ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
  };