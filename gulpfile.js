var gulp = require('gulp');
// namespaced depenencies sorted for us!
var plug = require('gulp-load-plugins')(); //run straight way
//var connect = require('gulp-connect');

/*******************************************  Variable Declarations ****************/
//  Done separately, since assigns are based on the build
var environment,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    buildDirectory,
    sassStyle;

/*******************************************  Variable Assignments ****************/
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




/******************************************************* Tasks ****************/

//------------------------------------- STYLES
// Process, combine & minify Sass/Compass stylesheets
gulp.task('styles', function(){
    return gulp
        .src(sassSources)
        .pipe(plug.plumber({
            errorHandler: onError
        }))    
        .pipe(plug.compass({
            sass: 'components/sass',
            image: buildDirectory + 'img',
            style: sassStyle
        }))
//        .on('error', plug.utils.log)
      .pipe(gulp.dest(buildDirectory + 'css'))
        .pipe(plug.notify({
            message: 'Styles task complete'
        }))    
      .pipe(plug.connect.reload());    
});

//------------------------------------- ANNOTATE
gulp.task('annotate', function(){
    return gulp
        .src(jsSources)
        .pipe(plug.ngAnnotate({ add: true, single_quotes: true}))
        .pipe(plug.uglify({mangle: true}))
        .pipe(gulp.dest('client/js'));
    
});

//------------------------------------- JSHINT
// Hint all of our custom developed Javascript to make sure things are clean
//        .pipe(plug.jshint('client/components/js/.jshintrc'))
//        .pipe(plug.jshint.reporter('jshint-stylish'));
gulp.task('jshint', function () {
    return gulp.src('./src/scripts/*.js')
    .pipe(plug.plumber({
        errorHandler: onError
    }))
    .pipe(plug.jshint())
    .pipe(plug.jshint.reporter('default'))
    .pipe(plug.notify({
        message: 'JS Hinting task complete'
    }));
});

//------------------------------------- SCRIPTS
// Combine/Minify/Clean Javascript files
gulp.task('scripts', function () {
    return gulp.src('./src/scripts/*.js')
    .pipe(plug.plumber({
        errorHandler: onError
    }))
    .pipe(plug.concat('app.min.js'))
//    .pipe(stripDebug())
    .pipe(plug.uglify())
    .pipe(gulp.dest('./js/'))
    .pipe(plug.notify({
        message: 'Scripts task complete'
    }));
});

//------------------------------------- COPY
// Copy fonts from a module outside of our project (like Bower)
gulp.task('copyfiles', function () {
    gulp.src('./source_directory/**/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./fonts'));
});

//------------------------------------- SERVER
gulp.task('server', function () {
    plug.connect.server({
            root: buildDirectory,
            port: 8080,
            livereload: true
        });
});

//------------------------------------- WATCH
gulp.task('watch', function() {
    return gulp
        .watch(jsSources, ['annotate'])
        .on('change', watchLog);

    function watchLog(event) {
        console.log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
});



/**************** GULP DEFAULT ****************/

// Gulp plumber error handler
var onError = function (err) {
    console.log(err);
}

// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['jshint', 'scripts', 'styles', 'watch']);



//gulp.task('default', ['annotate', 'jshint', 'js', 'compass', 'jsonminify']);






























