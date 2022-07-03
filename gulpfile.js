const gulp = require("gulp");
// Scripts
const webpack = require('webpack-stream');
// SCSS
const sass = require('gulp-dart-sass')
const stylelint = require('gulp-stylelint')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const concat = require('gulp-concat')
// Browser Sync
const browserSync = require("browser-sync");
const reload = browserSync.reload;

gulp.task('scripts', function() {
  return gulp.src('js/scripts.js')
    .pipe(webpack({
      mode: 'development'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('minifyScripts', function() {
  return gulp.src('js/scripts.js')
    .pipe(webpack({
      mode: 'production'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task("browser-sync", function() {
  const files = ["./scss/*.scss", "./*.php", "./js/*.js",];
  browserSync.init(files, {
    proxy: "http://newtheme:81",
    notify: true
  });
  gulp.watch("./scss/**/*.scss", gulp.series(css));
  gulp.watch("./js/*.js"), gulp.series("scripts");
  gulp.watch("./*.php").on("change", browserSync.reload);
});

// Stylesheets
const css = function() {
  return gulp
    .src('./scss/**/*.s+(a|c)ss')
    // Style Lint
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ],
      console: true
    }))
    // Output
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    // Autoprefixer
    .pipe(postcss([ autoprefixer() ]))
    // Concatenate
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'))
    .pipe(reload({ stream: true }));
};

const minify = function() {
  return gulp
    .src('./scss/**/*.s+(a|c)ss')
    // Style Lint
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ],
      failAfterError: true,
      console: true
    }))
    // Compress
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(postcss([ autoprefixer() ]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'))
};

const watch = function(cb) {
  gulp.watch("./scss/**/*.scss", gulp.series(css));
  gulp.watch("./js/*.js"), gulp.series("scripts");
  gulp.watch("./*.php").on("change", browserSync.reload);
  cb();
};

exports.css = css;
exports.watch = watch;
exports.minify = minify;
exports.build = gulp.series(minify, 'minifyScripts');
exports.default = gulp.series(watch, 'browser-sync');

// gulp.series // one by one
// gulp.parallel // altogether