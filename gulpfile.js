var gulp = require('gulp');
// namespaces installed depenencies for us!
var plugins = require('gulp-load-plugins'); 


//=========== Variable Declarations ===========//
//  Done separately, since assigns are based on the build
var environment,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    buildDirectory,
    sassStyle;

//=========== Variable Assignments ===========//
// Array in order of load. destintations plugged into variables for clarity
jsSources = [
    // project scripts
    'builds/development/js/app.js',
    'builds/development/js/controllers/mainController.js',
    'builds/development/js/controllers/page1Controller.js',
    'builds/development/js/controllers/page2Controller.js',
    'builds/development/js/directives/directives.js',
    'builds/development/js/tests.js'
];