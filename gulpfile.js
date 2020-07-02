var gulp = require('gulp');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var stylelint = require('stylelint');
var scss = require("postcss-scss");
var browser_sync = require('browser-sync').create();

// Lint SASS.
gulp.task('lint:sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(postcss(
      [
        stylelint({ /* options see .stylelintrc */ }),
        reporter({ clearMessages: true })
      ],
      { syntax: scss }
  ));
});

// Compile SASS, autoprefix, minify and pipe CSS.
gulp.task('sass', function () {

  var onError = function (err) {
    notify.onError({
      title:    "Gulp",
      subtitle: "Sass compiler error",
      message:  "Error: <%= error.message %>",
      sound: "Hero"
    })(err);
    this.emit('end');
  };

  return gulp.src('./assets/scss/**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./assets/css/'))
});

// Watch for changes.
gulp.task('watch', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

// Sets up browser sync.
gulp.task('browser-sync', function() {
  browser_sync.init({
    proxy: 'appserver',
    open: false
  });
});

// Build and lint SASS.
gulp.task('build', function () {
  gulp.start('lint:sass', 'sass');
});

// Default task which compiles Sass and watches for changes.
gulp.task('default', ['browser-sync', 'sass', 'watch']);

