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


// paths

var paths = {
  sass: ['./styles/**/*.sass'],
  js: ['./app/components/**/*.js', './app/components/**/*.jsx'],
  main: './app/main.js'
};

// clean compiled files

gulp.task('clean', function(done) {
  del(['public'], done);
});

// server
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// sass task, runs when any sass files change
gulp.task('styles', function() {
  return gulp.src(paths.sass)
          .pipe(sass({sourcemap: true, sourcemapPath: './styles', loadPath: require('node-bourbon').includePaths }))
          .pipe(gulp.dest('./public/'))
          .pipe(filter('**/*.css'))
          .pipe(reload({ stream: true }));
});

// js task, compiles all jsx files and browserify

gulp.task('scripts', ['clean'], function() {
  return browserify({
            entries: paths.main,
            debug: true,
            paths: ['./node_modules','./app/components/'],
            transform: [reactify]
          })
          .bundle()
          .pipe(source('main.js'))
          .pipe(gulp.dest('./public/'));
});

// watch task

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['styles']);
  gulp.watch(paths.jsx, ['scripts', reload]);
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

gulp.task('daemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      console.log('restarted server...');
    });
});

gulp.task('default', function() {
  runSequence(
    'clean',
    'styles',
    'scripts',
    'daemon'
  );

});

