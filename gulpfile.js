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

gulp.task('test', function(done) {
  var command = [
    './node_modules/intern/runner.js',
    'config=tests/intern'
  ];

  // Spawn the Intern process
  var child = require('child_process').spawn('node', command, {
    // Allow Intern to write directly to the gulp process's stdout and
    // stderr.
    stdio: 'inherit'
  });

  // Let gulp know when the child process exits
  child.on('close', function(code) {
    if (code) {
      done(new Error('Intern exited with code ' + code));
    } else {
      done();
    }
  });
});

var watcher = gulp.watch(['./**/*.*', '!./static/scripts/bundle.js'], ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});