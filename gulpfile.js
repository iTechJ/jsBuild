/*globals require*/
var gulp   = require('gulp'); //npm install gulp --save-dev
var jshint = require('gulp-jshint'); //npm install gulp-jshint --save-dev
var concat = require('gulp-concat'); //npm install gulp-concat --save-dev

gulp.task('script', function() {
    return gulp.src([
        "js/utils.js",
        "js/rpComponent.js",
        "js/error.js",
        "js/success.js",
        "js/modal.js"
    ])
    /* adding jshint task*/
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    /*adding concatenation*/
    .pipe(concat('result.js'))
    .pipe(gulp.dest('dist/'));

});

//Step 1: install gulp
//Step 2: add jshint
//Step 3: concatenate js