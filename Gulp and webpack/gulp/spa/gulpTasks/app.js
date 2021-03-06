const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')


function appHTML(cb){
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('build'))
}

function appCSS(cb){
    return gulp.src('src/assets/sass/index.scss')
        .pipe(sass().on('error',sass.logError)) //processa Sass transformando em CSS
        .pipe(uglifycss({"uglyComments":true})) 
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('build/assets/css'))
}

function appJS(cb){
    return gulp.src('src/assets/js/**/*.js')
        .pipe(babel({presets:['ENV']})) //Versão mais recente
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build/assets/js'))
}

function appIMG(cb){
    return gulp.src('src/assets/imgs/**/*.*')
        .pipe(gulp.dest('build/assets/imgs'))
}

gulp.task('appHTML',appHTML);
gulp.task('appJS',appJS);
gulp.task('appCSS',appCSS);
gulp.task('appIMG',appIMG);

module.exports = {
    appHTML,
    appCSS,
    appJS,
    appIMG
}
