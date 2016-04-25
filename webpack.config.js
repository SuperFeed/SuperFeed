'use strict'

let webpack = require('webpack')
let path = require('path')

const DEBUG = process.env.NODE_ENV !== 'production'

const config = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'client.jsx')
  ],
  output: {
    path: DEBUG ? '_client' : 'target/static',
    filename: DEBUG ? 'app.js' : 'app-[hash].js'
  },
  devtool: DEBUG ? '#eval-source-map' : '',
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        STATIC: JSON.stringify(process.env.STATIC || process.env.NODE_ENV || 'local'),
        FB_ENV: JSON.stringify(process.env.FB_ENV || proess.env.NODE_ENV || 'local')
      }
    })
  ],
  devServer: {
    proxy: {
      '*': 'http://localhost:3001'
    }
  }
}

if (!DEBUG) {
  config.plugins.push(function () {
    this.plugin('done', function (stats) {
      require('fs').writeFileSync(
        path.join(__dirname, 'target', 'stats.json'),
        JSON.stringify(stats.toJson().assetsByChunkName)
      )
    })
  })

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: false
  }))
}

module.exports = config
