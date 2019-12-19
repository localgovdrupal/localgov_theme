var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var versionAppend = require('gulp-version-append');

// clean the dist folder
gulp.task('clean', function(){

  del.sync(['dist/'])

});

// Lint and report on scss

var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var stylelint = require('stylelint');
var scss = require("postcss-scss");

gulp.task('lint:css', function() {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(postcss(
            [
                stylelint({ /* options */ }),
                reporter({ clearMessages: true })
            ],
            {
                syntax: scss
            }
        ));
});

// compile sass and autoprefix
gulp.task('sass', function(){

  var onError = function(err) {
        notify.onError({
          title:    "Gulp",
          subtitle: "Sass compiler error",
          message:  "Error: <%= error.message %>",
          sound: "Hero"
        })(err);

        this.emit('end');
    };

  return gulp.src('./src/assets/scss/**/*.scss')

    .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/assets/css/'))
    
});

// pipe js to dist/
gulp.task('js', function(){

  return gulp.src('./src/assets/js/*.js')
    //.pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/assets/js/'))

});


// optimise images
gulp.task('images', function(){

  return gulp.src('./src/assets/img/**/*')
    .pipe(changed('./dist/assets/img/**/*'))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/assets/img/'))

});


// pipe fonts to dist
gulp.task('fonts', function(){

  return gulp.src('./src/assets/fonts/**/*')
    .pipe(gulp.dest('./dist/assets/fonts/'))

});


// watch for changes
gulp.task('watch', function(){

  gulp.watch('src/assets/scss/**/*.scss',['sass'], ['scss-lint']);
  gulp.watch('src/assets/js/**/*.js',['js']);
  gulp.watch('src/assets/img/*',['images']);
  gulp.watch('src/assets/fonts/**/*',['fonts']);
  
});

// build entire dist folder
gulp.task('build',['clean','lint:css','sass','js','images','fonts']);