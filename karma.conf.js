// Karma configuration
// Generated on Mon Feb 23 2015 15:47:55 GMT+1100 (AEDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'web-app/thirdparty/angular/angular-1.3.13.min.js',
            'test/js/thirdparty/angular-mocks-1.3.13.js',
            'web-app/thirdparty/angular/ui-bootstrap-tpls-0.12.0.js',
            'web-app/thirdparty/angular-bootstrap-colorpicker-3.0.11/js/bootstrap-colorpicker-module.min.js',
            'web-app/thirdparty/leaflet/leaflet-0.7.3.js',
            'web-app/thirdparty/angular-leaflet/angular-leaflet-directive.min.js',
            'web-app/thirdparty/angular-loading-bar/loading-bar-0.7.1.min.js',
            'web-app/thirdparty/textAngular/textAngular-1.3.11.min.js',
            'web-app/thirdparty/textAngular/textAngular-rangy-1.3.11.min.js',
            'web-app/thirdparty/textAngular/textAngular-sanitize-1.3.11.min.js',
            'web-app/js/angular/profiles.js',
            'web-app/js/angular/utils/*.js',
            'web-app/js/angular/services/*.js',
            'web-app/js/angular/controllers/*.js',
            'test/js/specs/MockConfigModule.js',
            'test/js/specs/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: { 'web-app/js/angular/**/*.js': ['coverage'] },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
