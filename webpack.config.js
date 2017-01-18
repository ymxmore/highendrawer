'use strict';

const pkg = require('./package.json');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const banner = [
  `${pkg.name} - ${pkg.description}`,
  `@version v${pkg.version}`,
  `@link ${pkg.homepage}`,
  `@license ${pkg.license}`
].join("\n");

module.exports = [
  // Development
  {
    context: __dirname,
    devtool: 'source-map',
    entry: {
      'highendrawer': './src/highendrawer.js'
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].js',
      library: 'Highendrawer',
      libraryTarget: 'umd',
      sourceMapFilename: '[name].js.map'
    },
    eslint: {
      configFile: '.eslintrc.yml'
    },
    babel: {
      presets: [
        'es2015'
      ],
      plugins: [
        'transform-object-assign'
      ]
    },
    resolve: {
      extensions: ['', '.js', '.json'],
      modulesDirectories: [
        'src',
        'node_modules',
        __dirname + '/node_modules'
      ]
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /(spec|node_modules)/,
          loader: 'eslint'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        }
      ]
    },
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: true,
        files: [
          'dist/*.js',
          'index.html',
        ]
      }),
      new webpack.BannerPlugin(banner),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.NoErrorsPlugin(),
    ]
  },

  // Production
  {
    context: __dirname,
    devtool: 'source-map',
    entry: {
      'highendrawer': './src/highendrawer.js'
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].min.js',
      library: 'Highendrawer',
      libraryTarget: 'umd',
      sourceMapFilename: '[name].min.js.map'
    },
    eslint: {
      configFile: '.eslintrc.yml'
    },
    resolve: {
      extensions: ['', '.js', '.json'],
      modulesDirectories: [
        'src',
        'node_modules',
        __dirname + '/node_modules'
      ]
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /(spec|node_modules)/,
          loader: 'eslint'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: [
              'transform-object-assign'
            ]
          }
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin(banner),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        preserveComments: 'some',
        compress: {
          warnings: false
        }
      })
    ]
  }
];
