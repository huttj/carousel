'use strict';
const path       = require('path'),
      gulp       = require('gulp'),
      jade       = require('gulp-jade'),
      sass       = require('gulp-sass'),
      babel      = require('gulp-babel'),
      watch      = require('gulp-watch'),
      concat     = require('gulp-concat'),
      merge      = require('merge-stream'),
      sourcemaps = require('gulp-sourcemaps'),
      browserify = require('gulp-browserify'),
      livereload = require('gulp-server-livereload');

let tinylr;

gulp.task('express', function() {
  console.log(__dirname);
  const express = require('express');
  express()
    .use(require('connect-livereload')({port: 35723}))
    .use(express.static(__dirname))
    //.use(express.static('./'))
    .listen(9001, '0.0.0.0');
});


gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35723);
});

function notifyLiveReload(event) {
  console.log('Change detected, reloading!', event.path.match(/dist\/.+/));
  const fileName = path.relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
  gulp.watch("*", notifyLiveReload);
});

gulp.task('default', ['express', 'livereload', 'watch']);