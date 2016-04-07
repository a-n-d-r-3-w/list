'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');

gulp.task('default', function() {
  // Bundle JS files
  browserify('static/scripts/moduleCreator.js', { debug: true })
    .bundle()
    .pipe(vinylSourceStream('bundle.js'))
    .pipe(gulp.dest('static/scripts'));
});

gulp.task('copyBootstrapFiles', function() {
  gulp.src(['node_modules/bootstrap/dist/**/*'])
    .pipe(gulp.dest('static/styles/gulp_generated/bootstrap'));
});

var watcher = gulp.watch(['./**/*.*', '!./static/scripts/bundle.js'], ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});