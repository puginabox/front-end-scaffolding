var gulp = require('gulp');
// namespaced depenencies all sorted...
var plug = require('gulp-load-plugins')(); //run to the fore
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
    'staging/components/js/app.module.js',
    'staging/components/js/core/core.module.js'
//    'staging/components/js/core/config.js',
//    'staging/components/js/feature/feature.js',
//    'staging/components/js/feature/featureController.js',
//    'staging/components/js/dirFeature.js'
];
sassSources = ['development/components/sass/'];
htmlSources = [buildDirectory + '*.html'];
jsonSources = [buildDirectory + 'js/*.json'];


/**************** BUILDS ****************/
environment = process.env.NODE_ENV || 'staging';
/* 
    for Windoze users, just change this line to 
    environment = process.env.NODE_ENV || 'production';
*/
if (environment==='staging') {
    buildDirectory = 'builds/staging/'; 
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
            sass: 'development/components/sass',
            image: buildDirectory + 'img',
            style: sassStyle
        }))
//        .on('error', plug.utils.log)
//      .pipe(gulp.dest(buildDirectory + 'css')) // this for builds
        .pipe(gulp.dest('staging/components/css'))
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
        .pipe(gulp.dest('staging/js'));
    
});

//------------------------------------- JSHINT
// Hint all of our custom developed Javascript to make sure things are clean
//        .pipe(plug.jshint('staging/components/js/.jshintrc'))
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
// Copy fonts & other files
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
    .watch(sassSources, ['styles'])    
        .on('change', watchLog);

    function watchLog(event) {
        console.log('*** File ' +
                    event.path + ' was ' +
                    event.type + ', running tasks...');
    }
});



/**************** GULP DEFAULT ****************/

// Gulp plumber error handler
var onError = function (err) {
    console.log(err);
}

// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['annotate', 'jshint', 'scripts', 'styles', 'watch', 'server']);



//gulp.task('default', ['annotate', 'jshint', 'js', 'compass', 'jsonminify']);






























