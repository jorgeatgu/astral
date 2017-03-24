var gulp = require('gulp');
postcss = require('gulp-postcss');
sourcemaps = require('gulp-sourcemaps');
atImport = require('postcss-import');
selector = require('postcss-custom-selectors');
customProperties = require("postcss-custom-properties");
nested = require('postcss-nested');
reporter = require('postcss-reporter');
newer = require('gulp-newer');
nano = require('gulp-cssnano');
notify = require('gulp-notify');
browserSync = require('browser-sync');
rename = require('gulp-rename');


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

/* Tarea final para comprimir CSS y JavaScript */
gulp.task('build', ['minify']);
