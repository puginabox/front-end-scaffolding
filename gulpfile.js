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
    'client/components/js/app.module.js',
    'client/components/js/core/core.module.js',
    'client/components/js/core/config.js',
    'client/components/js/feature/feature.js',
    'client/components/js/feature/featureController.js',
    'client/components/js/dirFeature.js'
];