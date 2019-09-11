const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

let src_folder = './src/';
let src_assets_folder = src_folder + 'assets/';
let dist_folder = './dist/';
let dist_assets_folder = dist_folder + 'assets/';

gulp.task('clear', () => del([dist_folder]));

gulp.task('html', () => {
	return gulp.src([src_folder + '**/*.html'], {
			base: src_folder,
			since: gulp.lastRun('html')
		})
		.pipe(gulp.dest(dist_folder))
		.pipe(browserSync.stream());
});

gulp.task('sass', () => {
		// return gulp.src([
		// 	src_assets_folder + 'sass/**/*.sass'
		// ], {
		// 	since: gulp.lastRun('sass')
		// })
		return gulp.src(src_assets_folder + 'sass/**/*.sass')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded',
			indentedSyntax: true
		}))
		.pipe(autoprefixer())
		.pipe(minifyCss({
			level: {
				1: {
					specialComments: 0
				}
			}
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dist_assets_folder + 'css'))
		.pipe(browserSync.stream());
});

gulp.task('font', () => {
	return gulp.src(src_assets_folder + 'font/**/*', {
			since: gulp.lastRun('font')
		})
		.pipe(gulp.dest(dist_assets_folder + 'font'))
		.pipe(browserSync.stream());
})

gulp.task('js', () => {
	return gulp.src([src_assets_folder + 'js/**/*.js'], {
			since: gulp.lastRun('js')
		})
		.pipe(plumber())
		.pipe(webpack({
			mode: 'production'
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dist_assets_folder + 'js'))
		.pipe(browserSync.stream());
});

gulp.task('images', () => {
	return gulp.src([src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|ico|webp)'], {
			since: gulp.lastRun('images')
		})
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest(dist_assets_folder + 'images'))
		.pipe(browserSync.stream());
});

gulp.task('svg', () => {
	return gulp.src([src_assets_folder + 'images/**/*.svg'], {
		since: gulp.lastRun('svg')
	})
	.pipe(gulp.dest(dist_assets_folder + 'images'))
	.pipe(browserSync.stream());
});

gulp.task('build', gulp.series('clear', 'html', 'sass', 'js', 'images', 'svg', 'font'));

gulp.task('dev', gulp.series('html', 'sass', 'js'));

gulp.task('serve', () => {
	return browserSync.init({
		server: {
			baseDir: ['dist']
		},
		port: 3000,
		open: false,
		tunnel: 'sh8der'
	});
});

gulp.task('watch', () => {
	const watchImages = [
		src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|ico|webp)'
	];

	const watch = [
		src_folder + '**/*.html',
		src_assets_folder + 'sass/**/*.sass',
		src_assets_folder + 'js/**/*.js'
	];

	gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
	gulp.watch(watchImages, gulp.series('images')).on('change', browserSync.reload);
	gulp.watch(src_assets_folder + 'images/**/*.svg', gulp.series('svg')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
