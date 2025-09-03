const {src, dest, watch, parallel, series} = require('gulp');
const sass         = require('gulp-sass')(require('sass'));
const concat       = require ('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del          = require('del');

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist(){
    return del('dist');
}

// Копіювання зображень без оптимізації
function images(){
    return src('app/images/**/*')
        .pipe(dest('dist/images'));
}

function scripts(){
    return src([
        // 'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function styles(){
    return src('app/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function build (){
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base:'app'})
    .pipe(dest('dist'));
}

function watching(){
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);