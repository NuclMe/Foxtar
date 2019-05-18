var gulp = require('gulp'),
    scss = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglifyjs = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
            .pipe(scss({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                browsers: ['last 8 versions'],
                }))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
    return gulp.src('app/js/**/*.js')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function(){
    return gulp.src('app/*.html')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server : {
            baseDir: "app"
        }
    })
});

gulp.task('js', function(){
    return gulp.src(
        ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js', 
            'node_modules/slick-carousel/slick/slick.js',
          'node_modules/mixitup/dist/mixitup.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('app/js'))
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/js/**/*.js', gulp.parallel('script'))
    gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('js' ,'scss', 'browser-sync', 'watch'));