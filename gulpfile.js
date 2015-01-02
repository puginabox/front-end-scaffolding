var gulp = require('gulp');
// namespaced depenencies sorted for us!
var plug = require('gulp-load-plugins')(); //run straight way
//var connect = require('gulp-connect');

/*************  Variable Declarations ****************/
//  Done separately, since assigns are based on the build
var environment,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    buildDirectory,
    sassStyle;

/*************  Variable Assignments ****************/
// Array in order of load. destintations plugged into variables for clarity
jsSources = [
    // project scripts
    'client/components/js/app.module.js',
    'client/components/js/core/core.module.js'
//    'client/components/js/core/config.js',
//    'client/components/js/feature/feature.js',
//    'client/components/js/feature/featureController.js',
//    'client/components/js/dirFeature.js'
];
sassSources = ['client/components/sass/master.scss'];
htmlSources = [buildDirectory + '*.html'];
jsonSources = [buildDirectory + 'js/*.json'];


/**************** BUILDS ****************/
environment = process.env.NODE_ENV || 'development';
/* 
    for Windoze users, just change this line to 
    environment = process.env.NODE_ENV || 'production';
*/
if (environment==='development') {
    buildDirectory = 'builds/development/'; 
    //dont forget trailing slash for concatination!
    sassStyle = 'expanded';
} else {
    buildDirectory = 'builds/production/';
    sassStyle = 'compressed';
}




/************* Tasks ****************

|-------- ANNOTATE   ----------*/
gulp.task('annotate', function(){
    return gulp
        .src(jsSources)
        .pipe(plug.ngAnnotate({ add: true, single_quotes: true}))
        .pipe(plug.uglify({mangle: true}))
        .pipe(gulp.dest('client/js'));
    
});

//-------- JSHINT ------------/ NEEDS FIXING
//gulp('hint', function(){
//    return gulp
//        .src(jsSources)
//        .pipe(plug.jshint('client/components/js/.jshintrc'))
//        .pipe(plug.jshint.reporter('jshint-stylish'));
//});

//---- @SERVER & live-reloading task
gulp.task('server', function () {
    plug.connect.server({
            root: buildDirectory,
            port: 8080,
            livereload: true
        });
});

//-------- WATCH   ----------*/
gulp.task('watch', function() {
    return gulp
        .watch(jsSources, ['annotate'])
        .on('change', watchLog);

    function watchLog(event) {
        console.log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
});



/**************** GULP DEFAULT ****************/

//gulp.task('default', ['annotate', 'jshint', 'js', 'compass', 'jsonminify']);






























