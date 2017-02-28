var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /(\.js$|\.jsx$)/,
      loader: 'babel-loader',
      query: {
        presets: [
          'es2015',
          'react'
        ],
        plugins: [
          "transform-object-rest-spread"
        ]
      },
      include: [
        path.resolve(__dirname, 'app')
      ]
    }]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'app'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  }
};
