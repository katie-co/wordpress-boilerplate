const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const sassLint = require("gulp-sass-lint");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const concat = require("gulp-concat");
sass.compiler = require("node-sass");

gulp.task('babel', () =>
    gulp.src('js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
        .pipe(reload({ stream: true }))
);

gulp.task("browser-sync", function() {
  const files = ["./scss/*.scss", "./*.php", "./js/*.js",];
  browserSync.init(files, {
    proxy: "http://newtheme.local",
    notify: true
  });
  gulp.watch("./scss/**/*.scss", gulp.series(css));
  gulp.watch("./js/*.js"), gulp.series("babel");
  gulp.watch("./*.php").on("change", browserSync.reload);
});

const css = function() {
  return gulp
    .src("./scss/main.scss")
    // Sass Lint
    .pipe(sassLint({
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    // Source Maps
    .pipe(sourcemaps.init())
    // Compress
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(concat("style.css"))
    .pipe(gulp.dest("./"))
    .pipe(reload({ stream: true }));
};

const build = function() {
  return gulp
    .src("./scss/main.scss")
    // Sass Lint
    .pipe(sassLint({
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    // Source Maps
    .pipe(sourcemaps.init())
    // Compress
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(concat("style.css"))
    .pipe(gulp.dest("./"))
};

const watch = function(cb) {
  gulp.watch("./scss/**/*.scss", gulp.series(css));
  gulp.watch("./js/*.js"), gulp.series("babel");
  gulp.watch("./*.php").on("change", browserSync.reload);
  cb();
};

exports.css = css;
exports.watch = watch;
exports.build = gulp.series(build, "babel");
exports.default = gulp.series(css, "babel", watch, "browser-sync");

// gulp.series // one by one
// gulp.parallel // altogether