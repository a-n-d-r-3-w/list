'use strict';

var gulp = require('gulp');

gulp.task('default', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('static/styles/gulp_generated/bootstrap.min.css'));
});