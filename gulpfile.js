const {src, dest, series, watch, parallel} = require('gulp')
const browserSync = require("browser-sync").create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagecomp = require('compress-images');
const del = require('del');
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
    });


function browsersync() {
    browserSync.init({
        server: {baseDir: 'app/'},
        notify: false,
        online: true
    })
}

function scripts() {
    return src('app/script/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/script/'))
        .pipe(browserSync.stream())
}

function startWatch() {
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/style/*.css', styles);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images);
}

function styles() {
    return src('app/style/main.css')
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(dest('app/style/'))
        .pipe(browserSync.stream())
}

function cleandist() {
    return del('dist/**/*', {force: true}) // Удаляем все содержимое папки "dist/"
}

function buildcopy() {
    return src([
        'app/style/**/*.min.css',
        'app/script/**/*.min.js',
        'app/img/dest/**/*',
        'app/**/*.html',
    ], {base: 'app'}) // Параметр "base" сохраняет структуру проекта при копировании
        .pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
}

async function images() {
    imagecomp(
        "app/img/src/**/*",
        "app/img/dest/",
        {compress_force: false, statistic: true, autoupdate: true}, false,
        {jpg: {engine: "mozjpeg", command: ["-quality", "75"]}},
        {png: {engine: "pngquant", command: ["--quality=75-100", "-o"]}},
        {svg: {engine: "svgo", command: "--multipass"}},
        {gif: {engine: "gifsicle", command: ["--colors", "64", "--use-col=web"]}},
        function (err, completed) {
            if (completed === true) {
                browserSync.reload()
            }
        }
    )
}

function cleanimg() {
    return del('app/img/dest/**/*', {force: true}) // Удаляем все содержимое папки "app/images/dest/"
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.default = parallel(styles, scripts, browsersync, startWatch);
exports.build = series(cleandist, styles, scripts, images, buildcopy);
