// Karma configuration
// Generated on Sun Nov 13 2016 00:15:58 GMT+0900 (JST)

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['mocha'],
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'spec/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.spec.js': ['webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: {
      dir: 'report/coverage/',
      reporters: [
        {type: 'html'},
        {type: 'text'}
      ]
    },

    webpackMiddleware: {
      noInfo: true
    },

    webpack: {
      devtool: 'inline-source-map',
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
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: {
          presets: ['es2015']
        }
      },
      module: {
        preLoaders: [
          {
            test: /\.js/,
            exclude: /(spec|node_modules)/,
            loader: 'isparta'
          },
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
        ],
      },
      resolve: {
        extensions: ['', '.js', '.json'],
        modulesDirectories: [
          '',
          'src',
          'node_modules',
        ]
      }
    }
  });
};
