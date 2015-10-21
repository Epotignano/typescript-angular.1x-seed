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
  sassPath: ['./src/assets/sass', './src/app/components'],
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

/**BOWER INJECTION **/


/** SASS TO CSS **/
gulp.task('css', function() {
  return gulp.src( './src/assets/sass/*.scss')
    .pipe(sass({
      style: 'compressed',
      loadPath: [
        './src/assets/sass',
        config.bowerDir + '/foundation/scss'
      ]
    })
      .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
      })))
    .pipe(gulp.dest('./public/css'));
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean','css', 'bower'], function () {
  gulp.start('build');
});
