/*globals require*/
var gulp   = require('gulp'); //npm install gulp --save-dev
var jshint = require('gulp-jshint'); //npm install gulp-jshint --save-dev
var concat = require('gulp-concat'); //npm install gulp-concat --save-dev
var uglify = require('gulp-uglify'); //npm install gulp-uglify --save-dev
var rename = require('gulp-rename'); //npm install gulp-rename --save-dev
var minifycss = require('gulp-minify-css'); //npm install gulp-minify-css --save-dev
var notify = require('gulp-notify'); //npm install gulp-notify  --save-dev

gulp.task('script', function() {
    return gulp.src([
        "js/utils.js",
        "js/rpComponent.js",
        "js/error.js",
        "js/success.js",
        "js/modal.js"])

        /* adding jshint task*/
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        /*adding concatenation*/
        .pipe(concat('result.js'))
        .pipe(gulp.dest('dist/'))
        /*adding uglifying*/
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'Script task complete' }));
});

gulp.task('style', function() {
    return gulp.src('style/main.css')
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'Styles task complete' }));
});

//Step 0: install gulp
//Step 1: add jshint
//Step 2: concatenate js
//Step 3: minify & uglify js
//Step 4: minify css