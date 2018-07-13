// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer
//////////////////CSS
// Tâche "build" = LESS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('css', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', ['css'], function () {
  return gulp.src(destination + '/assets/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/assets/css/'));
    console.log("finished minify CSS");
});
//////////////////JS
//Tâce "scripts" = concat JS (source -> destination)
gulp.task('scripts', function() {
  return gulp.src(source + '/assets/js/*.js')
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(destination + '/assets/js'));
});
///////////////HTML
gulp.task('copyHtml', function () {
  return gulp.src(source + '/assets/html/*html')
    .pipe(gulp.dest(destination + '/assets/html/'));
});
///////////////Images
gulp.task('copyImg', function () {
  return gulp.src(source + '/assets/img/*jpg')
    .pipe(gulp.dest(destination + '/assets/img/'));
});
// Tâche "build"
gulp.task('build', ['minify']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.less', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);