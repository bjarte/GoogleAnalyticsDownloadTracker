// Include gulp and plugins
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshintStylish = require('jshint-stylish');

// Check JavaScript files for errors
gulp.task('jshint', function () {
    return gulp.src('ga-download-tracker.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(jshint.reporter('fail'));
});

// Minify JavaScript
gulp.task('minify-js', function () {
    gulp.src('ga-download-tracker.js')
        .pipe(sourcemaps.init())
        .pipe(uglify({ preserveComments: 'license' }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});


// Watch JS files for changes, rebuild on change
gulp.task('watch', function () {
    gulp.watch('*.js', ['default']);
});

gulp.task('default', ['jshint', 'minify-js']);