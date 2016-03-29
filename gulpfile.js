'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');

gulp.task('default', function() {

  // Copy bootstrap files
  gulp.src(['node_modules/bootstrap/dist/**/*'])
    .pipe(gulp.dest('static/styles/gulp_generated/bootstrap'));
  // copyFile('node_modules/bootstrap / dist / css / bootstrap.min.css ',
  //   'static/styles/gulp_generated');
  // copyFile('node_modules/bootstrap/dist/css/bootstrap.min.css.map',
  //   'static/styles/gulp_generated');

  // Bundle JS files
  browserify('static/scripts/moduleCreator.js').bundle()
    .pipe(vinylSourceStream('bundle.js'))
    .pipe(gulp.dest('static/scripts'));
});

// var watcher = gulp.watch('node_modules/bootstrap/**/*.css', ['copyBootstrapFiles']);
// watcher.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });