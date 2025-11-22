const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: '@jsdevtools/coverage-istanbul-loader',
        options: { 
          esModules: true,
          produceSourceMap: true
        },
        enforce: 'post',
        include: path.join(__dirname, 'src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /\.ngfactory\.js$/,
          /\.ngstyle\.js$/
        ]
      }
    ]
  }
};