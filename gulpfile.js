var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-ruby-sass');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

// paths

var paths = {
  sass: ['./src/sass/**/*.sass'],
  js: ['./src/js/**/*.js'],
  jsx: ['./src/js/**/*.jsx'],
  html: ['./src/**/*.html'],
  main: ['./src/js/main.jsx'],
  bundle: './app.js'
};

// clean compiled files

gulp.task('clean', function(done) {
  del(['dist'], done);
});

// server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// sass task, runs when any sass files change
gulp.task('sass', function() {
  return gulp.src(paths.sass)
          .pipe(sass())
          .pipe(gulp.dest('./dist/css'))
          .pipe(reload({ stream: true }));
});

// js task, compiles all jsx files and browserify

gulp.task('js', ['clean'], function() {
  return browserify({
            entries: paths.main,
            debug: true
          })
          .transform(reactify)
          .bundle()
          .pipe(source(paths.bundle))
          .pipe(gulp.dest('./dist/js'));
});

// watch task

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jsx, ['js', reload]);
  gulp.watch([paths.html, './index.html'], reload);
});

// default task to be run with `gulp`
gulp.task('default', ['clean', 'sass', 'js', 'browser-sync', 'watch'], function() {
});

