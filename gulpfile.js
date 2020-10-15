'use strict';

/**
 * gulpfile.js requirements
 */

// Scaffold requirements
const gulp = require('gulp'), // This taskrunner,
      rename = require('gulp-rename'), // Allows to rename files for destination See https://yarnpkg.com/package/gulp-rename
      config = require('./config/gulpconfig.js'); // Import config

// CSS requirements
const sass = require('gulp-sass'), // Sass plugin for gulp See https://yarnpkg.com/package/gulp-sass
      sassGlob = require('gulp-sass-glob'), // Allows the import of patterns through '/**/*.scss' See https://yarnpkg.com/package/gulp-sass-glob
      postcss = require('gulp-postcss'), // PostCSS processor https://github.com/postcss/postcss
      reporter = require('postcss-reporter'),
      scss = require("postcss-scss"),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      browserSync = require('browser-sync').create(), // Create BrowserSync instance See https://www.browsersync.io/docs/gulp
      autoprefixer = require('autoprefixer'), // Automatically add vendor rules https://github.com/postcss/autoprefixer
      cssnano = require('cssnano'), // Minify CSS stylsheets https://cssnano.co/
      sourcemaps = require('gulp-sourcemaps'), // Enables sourcemap generation https://yarnpkg.com/package/gulp-sourcemaps
      stylelint = require('stylelint'); // SASS and CSS style linting https://stylelint.io/

// JS requirements
// to be added...

/**
 *
 * Base Utilities start
 * Here we set up some configuration and functions that we may reuse
 *
 */

/**
 * PostCSS plugins and configuration mapped to gulpconfig.js
 */
const postcssPlugins = [
  stylelint({ /* options see .stylelintrc */ }),
  autoprefixer(),
];

/**
 * CSSnano configuration mapped to gulpconfig.js
 */
const postCSSnano = [
  cssnano({
    preset: ['default', {
      discardComments: {
        removeAll: config.css.cssnano.removeAllComments,
      },
      reduceTransforms: config.css.cssnano.reduceTransforms,
    }]
  })
];

// Lint SASS.
/* gulp.task('lint:sass', function () {
  return gulp.src('')
    .pipe(postcss(
      [
        stylelint({  }),
        reporter({ clearMessages: true })
      ],
      { syntax: scss }
  ));
}); */

// Compile SASS, autoprefix, minify and pipe CSS.
/* gulp.task('sass', function () {

  var onError = function (err) {
    notify.onError({
      title:    "Gulp",
      subtitle: "Sass compiler error",
      message:  "Error: <%= error.message %>",
      sound: "Hero"
    })(err);
    this.emit('end');
  };

  return gulp.src('./')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./assets/css/'))
}); */


/**
 *
 * Functions start
 *
 */

/**
 * Start browserync with gulpconfig.js configuration
 */
function browserSyncStart() {
  browserSync.init({
    proxy: 'appserver',
    open: false
  });
}

/**
 * Generates the drupal stylesheet from patterns
 */
function generateStyle() {
  return (
    gulp
      .src('./assets/scss/**/*.scss', { base: './assets/scss' })
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(rename('style.css')) // Rename the file to style.css
      .pipe(postcss(postcssPlugins)) // Run postCSS
      .pipe(postcss(postCSSnano)) // Run postCSS, CSSnano has to run last
      .pipe(sourcemaps.mapSources(function(sourcePath, file) {
        return '../source/' + sourcePath;
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('css/'))
  );
}

/**
 * Watches SASS files in source/components and re-compiles them on change
 */
function watchStyle() {
  return (
    gulp
      .watch('./source/components/**/*.scss')
      .on('change', generateStyle)
  );
}

/**
 * Serve files by streaming them into browserSync
 */
function serve() {
  return (
    gulp
      .watch(['./assets/js/*.js', './assets/css/*.css', './**/*.twig'])
      .on('change', browserSync.reload)
  );
}
/**
 * Functions end
 */





/**
 * Gulp tasks exports start
 */

/** Default development task */
const dev = gulp.series(
  generateStyle,
  gulp.parallel(browserSyncStart, watchStyle, serve)
);

// Expose the task by exporting it, this allows you to run it from the commandline
exports.dev = dev;


/*
* Gulp tasks exports end
*/
