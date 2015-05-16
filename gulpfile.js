var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-ruby-sass');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var filter = require('gulp-filter');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;


// paths

var paths = {
  sass: ['./styles/**/*.sass'],
  js: ['./app/components/**/*.js', './app/components/**/*.jsx'],
  client: './app/client.js'
};

// clean compiled files

gulp.task('clean', function(done) {
  del(['public'], done);
});

// sass task, runs when any sass files change
gulp.task('styles', function() {
  return sass('./styles/', { sourcemap: true, loadPath: require('node-bourbon').includePaths})
          .on('error', function (err) {
            console.error('Error!', err.message);
          })
          .pipe(gulp.dest('./public/'))
          .pipe(reload({ stream: true }));
});

// js task, compiles all jsx files and browserify

gulp.task('scripts', function() {
  return browserify({
            entries: paths.client,
            debug: true,
            paths: ['./node_modules','./app/components/'],
            transform: [reactify]
          })
          .bundle()
          .pipe(source('client.js'))
          .pipe(gulp.dest('./public/'));
});

// watch task

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['styles']);
  gulp.watch(paths.js, function() {
    runSequence('scripts', reload);
  });
  // gulp.watch(paths.html, reload);
});

// default task to be run with `gulp`
// gulp.task('default', ['clean', 'styles', 'scripts', 'server', 'watch'], function() {
// });

// build task for preparing the server

gulp.task('build', ['clean', 'styles', 'scripts'], function() {
  console.log('Build completed.');
});



// nodemon

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
    script: 'server.js'
  })
    .on('start', function onStart() {
      // ensure start called only once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      console.log('restarting server...');
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

// server
gulp.task('server', ['nodemon'], function() {
  browserSync.init({
    files: ['public/**/*.*'],
    proxy: "localhost:5000",
    port: 4000,
    notify: true
  });
});

gulp.task('default', function() {
  runSequence(
    'clean',
    'styles',
    'scripts',
    'server',
    'watch'
  );

});

