var gulp = require('gulp');
// namespaced depenencies all sorted...
var plug = require('gulp-load-plugins')(); //run to the fore
var connect = require('gulp-connect');
var minifyHTML = require('gulp-minify-html');
/*******************************************  Variable Declarations ****************/
//  Done separately, since assigns are based on the build
var buildDirectory,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources;

/*******************************************  Variable Assignments ****************/
// Array in order of load. destintations plugged into variables for clarity
jsSources = [
    // project scripts
    'development/components/scripts/app.module.js',
    'development/components/scripts/core/core.module.js',
    'development/components/scripts/core/config.js',
    'development/components/scripts/feature/feature.js',
    'development/components/scripts/feature/featureController.js',
    'development/components/scripts/dirFeature.js'
];
sassSources = ['development/components/sass/**/*.scss'];
htmlSources = ['development/*.html'];
jsonSources = ['development/components/scripts/*.json'];


/******************************************************* Tasks ****************/

//---------------------------------------------------- STYLES

// Process & Combine Sass/Compass styles
// nested, expanded, compact, compressed
gulp.task('styles', function(){
    return gulp
        .src(sassSources)
        .pipe(plug.compass({
        css: 'development/styles',
        sass: 'development/components/sass',
        image: 'development/img',
        style: 'nested',
        comments: true
    }))
    .pipe(plug.plumber({
        errorHandler: onError
    }))
    .pipe(gulp.dest('development/styles'));
});
// ADD LINE COMENTS NOW


//----------------------------------------------- STAGING BUILD   
    gulp.task('minifyCSS', function() {
        return gulp
        .src(sassSources)
        .pipe(plug.compass({
            css: 'development/styles',
            sass: 'development/components/sass',
            image: 'development/img',
            style: 'compact',
            comments: true
        }))
        .pipe(plug.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plug.cssmin({
            keepBreaks:true,
            lineNumbers: true
        }))
        .pipe(plug.rename('master.min.css'))
        .pipe(gulp.dest('builds/staging/'));
    });  



//------------------------------------- ANNOTATE
gulp.task('annotate', function(){
    return gulp
        .src(jsSources)
        .pipe(plug.ngAnnotate({ add: true, single_quotes: true}))
        .pipe(plug.uglify({mangle: true}))
        .pipe(gulp.dest('builds/staging/scripts'));
    
});

//------------------------------------- JSHINT
// Hint all of our custom developed Javascript to make sure things are clean
//        .pipe(plug.jshint('staging/components/js/.jshintrc'))
//        .pipe(plug.jshint.reporter('jshint-stylish'));
gulp.task('jshint', function () {
    return gulp.src(jsSources)

        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('default'))
        .pipe(plug.plumber({
            errorHandler: onError
        }));
});

//------------------------------------- SCRIPTS
// Combine/Minify/Clean Javascript files
gulp.task('scripts', function () {
    return gulp.src(jsSources)
        .pipe(plug.plumber({
            errorHandler: onError
        }))
        .pipe(plug.concat('behavior.min.js'))
    //    .pipe(stripDebug())
        .pipe(plug.uglify())
        .pipe(gulp.dest('development/scripts/'))
        .pipe(plug.notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('html', function() {
    return gulp.src('development/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('builds/staging'))
        .pipe(connect.reload());
}); 

gulp.task('jsonMinify', function() {
    return gulp.src('development/components/scripts/*.json')
        .pipe(plug.jsonminify())
        .pipe(gulp.dest('builds/staging/scripts'))
        .pipe(connect.reload());
});


//------------------------------------- SERVER
gulp.task('server', function () {
    connect.server({
        root: buildDirectory,
        port: 8080,
        livereload: true
    });
});

//------------------------------------- WATCH
gulp.task('watch', function() {
    gulp.watch(sassSources, ['styles']).on('change', watchLog);
    gulp.watch(jsSources, ['scripts']).on('change', watchLog);    
    gulp.watch('development/*.html', ['html']).on('change', watchLog);    
//    gulp.watch('development/scripts/*.json', ['json']).on('change', watchLog);   
    
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
};

gulp.task('default', ['annotate', 'jshint', 'scripts', 'styles', 'watch', 'server']);
gulp.task('deploy', ['annotate', 'jshint', 'scripts', 'jsonMinify', 'styles', 'minifyCSS', 'html']);






























