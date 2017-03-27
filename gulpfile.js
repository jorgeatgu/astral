var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var atImport = require('postcss-import');
var selector = require('postcss-custom-selectors');
var customProperties = require("postcss-custom-properties");
var nested = require('postcss-nested');
var reporter = require('postcss-reporter');
var newer = require('gulp-newer');
var nano = require('gulp-cssnano');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');

var paths = {};
paths.dist = './dist';


gulp.task("browserSync", function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

/* Notificando errores de CSS */
function errorAlertPost(error) {
    notify.onError({
        title: "Gulp postCSS",
        subtitle: "Algo esta mal en tu CSS!",
        sound: "Basso"
    })(error);
    console.log(error.toString());
    this.emit("end");
}

/* ==========================================================================
   Lanzando postCSS
   ========================================================================== */
/*
 * El orden de los plugins debe ser respetado.
 *
 * Antes de que nuestro CSS empiece a ser transformado por los diferentes
 * plugins vamos a 'lintear' nuestro CSS para seguir un orden y concierto.
 *
 *
 */

gulp.task('css', function() {
    var processors = [
        atImport,
        reporter({
            clearMessages: true
        }),
        nested,
        customProperties,
        selector
    ];
    return gulp.src('./src/css/styles.css')

        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .on("error", errorAlertPost)
        .pipe(sourcemaps.write('./', {
            sourceRoot: '/src'
        }))
        .pipe(rename('astral.css'))
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'postCSS complete'
        }));
});

/* Lanzando CSSnano para comprimir CSS */
gulp.task('minify', function() {
    return gulp.src('./css/astral.css')
        .pipe(nano())
        .pipe(rename('astral.min.css'))
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'CSSnano task complete'
        }));
});

/* Tarea por defecto para compilar CSS y comprimir imagenes */
gulp.task('default', ["browserSync"], function() {
    gulp.watch('./src/css/**', ['css']);
    gulp.watch(["./*.html", "css/*.css"]).on("change", browserSync.reload);
});

gulp.task('dist', function(){
    gulp.src('./css/**/*.min.css').pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('clean', function() {
 return gulp.src(paths.dist)
 .pipe(clean());
});

/* Tarea final para comprimir CSS y JavaScript */
gulp.task('build', sequence('clean', 'minify', 'dist'));

