const pkg = require('./package.json');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const banner = [
  `${pkg.name} - ${pkg.description}`,
  `@version v${pkg.version}`,
  `@link ${pkg.homepage}`,
  `@license ${pkg.license}`,
].join('\n');

module.exports = [
  // Development
  {
    mode: 'development',
    context: __dirname,
    devtool: 'source-map',
    entry: {
      'highendrawer': './src/highendrawer.js',
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].js',
      library: 'Highendrawer',
      libraryTarget: 'umd',
      libraryExport: 'default',
      sourceMapFilename: '[name].js.map',
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        'src',
        'node_modules',
        __dirname + '/node_modules',
      ],
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(spec|node_modules)/,
          loader: 'eslint-loader',
          options: {
            configFile: './.eslintrc.yml',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: ['transform-object-assign'],
            presets: ['@babel/preset-env'],
          },
        },
      ],
    },
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: true,
        files: [
          'dist/*.js',
          'index.html',
        ],
      }),
      new webpack.BannerPlugin(banner),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  },

  // Production
  {
    mode: 'production',
    context: __dirname,
    devtool: 'source-map',
    entry: {
      'highendrawer': './src/highendrawer.js',
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].min.js',
      library: 'Highendrawer',
      libraryTarget: 'umd',
      libraryExport: 'default',
      sourceMapFilename: '[name].min.js.map',
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        'src',
        'node_modules',
        __dirname + '/node_modules',
      ],
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(spec|node_modules)/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                configFile: './.eslintrc.yml',
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['transform-object-assign'],
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin(banner),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  },
];
