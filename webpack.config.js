const pkg = require('./package.json');
const webpack = require('webpack');

module.exports = {
  entry: './src/liff.js',
  output: {
    path: __dirname + '/dist',
    filename: 'vconsole-liff.min.js',
    library: 'vConsole-LIFF',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.html$/, use: 'html-loader'
      },
      {
        test: /\.js$/, use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: [
      pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
      'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
      pkg.license + ' license'
    ].join('\n')})
  ]
}