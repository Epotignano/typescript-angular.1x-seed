/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var sass = require('gulp-ruby-sass');
var notify = require("gulp-notify");
var bower = require('gulp-bower');

var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components'
}


/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean', 'bower'], function () {
  gulp.start('build');
});
