var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-ruby-sass');

// Static Server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// sass task, runs when any sass files change
gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.sass')
                            .pipe(sass())
                            .pipe(gulp.dest('./dist/css'))
                            .pipe(reload({ stream: true }));
});

// default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch("./src/sass/**/*.sass", ['sass']);
});

