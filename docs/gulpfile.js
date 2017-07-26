var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

/* Optimizing  files */
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

var del = require('del');

var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

/* build */
var runSequence = require('run-sequence');



gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload); 
});


//Optimizing files

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    /*.pipe(gulpif('*.js', uglify()))*/
    /*.pipe(gulpIf('*.css', cssnano()))*/
    .pipe(gulp.dest('dist'))
});

/*css */
gulp.task('autoprefixer' , function() {
	return gulp.src('app/*/**.css')
	/*.pipe(sourcemaps.init())*/
	.pipe(postcss([ autoprefixer(), cssnano() ]))
	/*.pipe(sourcemaps.write('.'))*/
	.pipe(gulp.dest('dist'))
});

//Optimizing images 
gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'))
});

//move fonts into dist
gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

// delete dist folder //
gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('build', function(callback) {
	runSequence('clean:dist',
		['sass', 'useref', 'autoprefixer','images', 'fonts'],
		callback)
})

