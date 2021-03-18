const gulp = require('gulp')
// JS
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify');
// SCSS
const sass = require('gulp-dart-sass')
const stylelint = require('gulp-stylelint')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
// Watch
const browserSync = require('browser-sync')
const reload = browserSync.reload

gulp.task('rollup', function() {
  return gulp.src('js/*.js')
    .pipe(rollup({ 
            plugins: [
        babel( { compact: false } ),
        resolve(), 
        commonjs()
      ]
    }, 'umd'))
    .pipe(gulp.dest('.'))
    .pipe(reload({ stream: true })
  )
});

gulp.task('uglify', function() {
  return gulp.src('js/*.js')
    .pipe(rollup({ 
            plugins: [
        babel( { compact: true } ),
        resolve(), 
        commonjs()
      ]
    }, 'umd'))
    .pipe(uglify())
    .pipe(gulp.dest('.'))
    .pipe(reload({ stream: true })
  )
});

gulp.task('browser-sync', function() {
  const files = ['./scss/*.s+(a|c)ss', './*.php', './js/*.js',];
  browserSync.init(files, {
    proxy: 'https://yoursitename.local',
    notify: true
  });
  gulp.watch('./scss/**/*.s+(a|c)ss', gulp.series(css));
  gulp.watch('./js/*.js'), gulp.series('rollup');
  gulp.watch('./*.php').on('change', browserSync.reload);
});

const css = function() {
  return gulp
    .src('./scss/**/*.s+(a|c)ss')
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ],
      failAfterError: true,
      console: true
    }))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'))
    .pipe(reload({ stream: true }));
};

const minify = function() {
  return gulp
    .src('./scss/**/*.s+(a|c)ss')
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ],
      failAfterError: true,
      console: true
    }))
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(postcss([ autoprefixer() ]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'))
};

const watch = function(cb) {
  gulp.watch('./scss/**/*.scss', gulp.series(css));
  gulp.watch('./js/*.js'), gulp.series('rollup');
  gulp.watch('./*.php').on('change', browserSync.reload);
  cb();
};

exports.css = css;
exports.watch = watch;
exports.build = gulp.series(minify, 'uglify');
exports.default = gulp.series(css, 'rollup', watch, 'browser-sync');
