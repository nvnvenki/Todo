module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'js/angular.js',
      'js/angular-*.js',
      'js/angular-mocks.js',
      'js/*.js',
      'tests/*.js'
    ],

    exclude : [
      'js/angular-loader.js',
      'js/*.min.js',
      'js/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
