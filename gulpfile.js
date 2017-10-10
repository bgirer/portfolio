var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var less = require('gulp-less');
var es = require('event-stream');
var merge = require('gulp-merge');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

var paths = {
    'source': {
        'app_less': 'portfolio/staticfiles/src/less/app',
        'vendor_less': 'portfolio/staticfiles/src/less/vendor',
        'vendor_css': 'portfolio/staticfiles/src/css/vendor',
        'app_js': 'portfolio/staticfiles/src/js/app',
        'vendor_js': 'portfolio/staticfiles/src/js/vendor',
        'images': 'portfolio/staticfiles/src/images',
        'fonts': 'portfolio/staticfiles/src/fonts'
    },
    'build': {
        'css': 'portfolio/staticfiles/dist/css',
        'js': 'portfolio/staticfiles/dist/js',
        'images': 'portfolio/staticfiles/dist/images',
        'fonts': 'portfolio/staticfiles/dist/fonts'
    }
};

gulp.task('main_less', function () {
    return gulp.src(paths.source.app_less + '/style.less')
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(uglifycss().on('error', function (err) {
            console.log(err);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.build.css))
});

gulp.task('vendor_less', function () {
    return gulp.src(paths.source.vendor_less + '/*.less')
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(uglifycss().on('error', function (err) {
            console.log(err);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.build.css + '/vendor'))
});

gulp.task('vendor_css', function () {
    return gulp.src([
        paths.source.vendor_css + '*.css',
        '!' + paths.source.vendor_css + '*.min.css',
        paths.source.vendor_css + '**/*.css',
        '!' + paths.source.vendor_css + '**/*.min.css',
        paths.source.vendor_css + '**/**/*.css',
        '!' + paths.source.vendor_css + '**/**/*.min.css'
    ])
        .pipe(uglifycss().on('error', gutil.log))
        .pipe(rename(function (path) {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('app_js', function () {
    return gulp.src([
        paths.source.app_js + '*/js',
        '!' + paths.source.app_js + '*.min.js',
        paths.source.app_js + '**/*.js',
        '!' + paths.source.app_js + '**/*.min.js'
    ])
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest(paths.build.js));
});

gulp.task('vendor_js', function () {
    return gulp.src([
        paths.source.vendor_js + '*.js',
        '!' + paths.source.vendor_js + '*.min.js',
        paths.source.app_js + '**/*.js',
        '!' + paths.source.app_js + '**/*.min.js',
        paths.source.vendor_js + '**/**/*.js',
        '!' + paths.source.vendor_js + '**/**/*.min.js'
    ])
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename(function (path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest(paths.build.js));
});

gulp.task('images', function () {
    return gulp.src(paths.source.images + '/**')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.build.images))
});

gulp.task('fonts', function () {
    return gulp.src(paths.source.fonts + '/**')
        .pipe(gulp.dest(paths.build.fonts))
});

gulp.task('css_tasks', ['main_less', 'vendor_css', 'vendor_less']);
gulp.task('js_tasks', ['app_js', 'vendor_js']);
gulp.task('default', ['css_tasks', 'js_tasks', 'images', 'fonts']);
