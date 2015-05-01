/* jshint node:true */
'use strict';
// generated on 2015-01-16 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var jsFileList = ['js/plugins/*.js'];

gulp.task('styles', function () {
    return gulp.src('scss/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
        style: 'expanded',
        precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('css'));
});

gulp.task('js', function() {
  return gulp.src(jsFileList)
    .pipe($.concat('plugins.js'))
    .pipe($.rename('plugins.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('js/'));
});

// gulp.task('jshint', function () {
//     return gulp.src('app/scripts/**/*.js')
//      .pipe(reload({stream: true, once: true}))
//     .pipe($.jshint())
//     .pipe($.jshint.reporter('jshint-stylish'))
//     .pipe($.jshint.reporter('fail'));
// });

// gulp.task('html', ['styles'], function () {
//     var lazypipe = require('lazypipe');
//     var cssChannel = lazypipe()
//     .pipe($.csso)
//     .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');
//     var assets = $.useref.assets({searchPath: '{css,app}'});
//
//     return gulp.src('app/*.html')
//     .pipe(assets)
//     .pipe($.if('*.js', $.uglify()))
//     .pipe($.if('*.css', cssChannel()))
//     .pipe(assets.restore())
//     .pipe($.useref())
//     .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('images', function () {
    return gulp.src('img/src/**/*')
    .pipe($.size({title: 'Before'}))
    .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest('img/dist'))
    .pipe($.size({title: 'After'}));
});

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')().concat('fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('fonts'));
});

// gulp.task('extras', function () {
//     return gulp.src([
//         'app/*.*',
//         '!app/*.html',
//         'node_modules/apache-server-configs/dist/.htaccess'
//     ], {
//         dot: true
//     }).pipe(gulp.dest('dist'));
// });
//

gulp.task('clean', require('del').bind(null, ['img/dist/*']));

gulp.task('serve', ['styles'], function () {
  // Launch BrowserSync
  browserSync({
    notify: false,
    port: 9000,
    // server: {
    //   baseDir: "./",
    //   routes: {
    //     '/bower_components': 'bower_components'
    //   }
    // }
    proxy: "localhost/adankoff.github.io"
  });

  // watch for changes
  gulp.watch([
    '**/*.php',
    'css/*.css',
    'js/**/*.js',
    'img/dist/*'
  ]).on('change', reload);
  gulp.watch('scss/**/*.scss', ['styles', reload]);
  gulp.watch('woocommerce/css/*.scss', ['styles', reload]);
  gulp.watch('img/src/**/*', ['images', reload]);
});

gulp.task('default', function () {
    gulp.start('serve');
});
