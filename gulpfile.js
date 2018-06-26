var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var reload = browserSync.reload;

// var src = {
//     scss: 'app/scss/*.scss',
//     css: 'app/css',
//     html: 'app/*.html'
// };
var src = {
  scss: 'app/main.scss',
  css: 'app/main.css',
  js: 'app/**/*.js',
  html: 'app/**/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './app',
    notify: false
  });

  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.js).on('change', reload);
  gulp.watch(src.html).on('change', reload);
});

gulp.task('sass', function () {
  return gulp
    .src(src.scss, {
      base: './app'
    })
    .pipe(sass({
      includePaths: ['node_modules/tachyons-sass/']
    }).on('error', sass.logError))
    .pipe(changed('./app'))
    .pipe(gulp.dest('./app'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('default', ['serve']);