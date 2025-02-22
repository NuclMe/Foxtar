const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// Compile SCSS into CSS
function scssTask() {
  return src('app/scss/**/*.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

// Reload Browser on JS changes
function scriptTask() {
  return src('app/js/**/*.js').pipe(browserSync.stream());
}

// Reload Browser on HTML changes
function codeTask() {
  return src('app/*.html').pipe(browserSync.stream());
}

// Copy everything to /docs for GitHub Pages
function buildTask() {
  return src('app/**/*').pipe(dest('docs'));
}

// Minify & bundle JS libraries
function jsTask() {
  return src([
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'));
}

// Start local dev server
function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: 'app',
    },
  });
}

// Watch for changes
function watchTask() {
  watch('app/scss/**/*.scss', scssTask);
  watch('app/js/**/*.js', scriptTask);
  watch('app/*.html', codeTask);
}

// Default task (Build first, then start dev server)
exports.default = series(
  jsTask,
  scssTask,
  buildTask,
  parallel(browserSyncTask, watchTask)
);

// Separate build task for deployment
exports.build = series(jsTask, scssTask, buildTask);
