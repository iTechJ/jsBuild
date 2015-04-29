/*globals require*/
var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});




//Step 1: install gulp
//Step 2: add jshint