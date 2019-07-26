var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var cleanCSS = require('gulp-clean-css');
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
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: false
    }))
    // .pipe(cleanCSS())
		.pipe(gulp.dest('./dist/assets/css/'))
    .pipe(browserSync.stream())
    
});


// pipe js to dist/
gulp.task('js', function(){
	// if specific order is required
  // return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
	return gulp.src('./src/assets/js/*.js')
		.pipe(concat('main.js'))
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


// pipe fonts to dist/
gulp.task('fonts', function(){

	return gulp.src('./src/assets/fonts/**/*')
		.pipe(gulp.dest('./dist/assets/fonts/'))

});


// pipe inc folder to dist/
gulp.task('html', function(){

	return gulp.src(['./src/inc/**/*'])
		.pipe(changed('./dist/inc/'))
		.pipe(gulp.dest('./dist/inc/'))
		.pipe(browserSync.stream())

});


// pipe php files to dist/
gulp.task('php', function(){

	return gulp.src(['./src/*.php'])
		.pipe(changed('./dist/'))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream())

});


// BrowserSync reload all browsers
gulp.task('browsersync-reload', function () {

  browserSync.reload();

});

// watch for changes and initialise browserSync
gulp.task('watch', function(){

  browserSync.init({
		proxy: 'localhost:8888/client/croydon/Theme/croydon-theme/dist'
  });

  gulp.watch('src/assets/scss/**/*.scss',['sass']);
  gulp.watch('src/assets/js/**/*.js',['js','browsersync-reload']);
  gulp.watch('src/assets/img/*',['images','browsersync-reload']);
  gulp.watch('src/assets/fonts/**/*',['fonts','browsersync-reload']);
  gulp.watch('src/inc/**/*.html',['html']);
  gulp.watch('src/*.php',['php']);
	
});

// build entire dist folder
gulp.task('build',['clean','sass','js','images','fonts','html','php']);