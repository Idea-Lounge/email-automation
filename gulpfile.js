(function () {
    "use strict";

    var gulp = require('gulp'),
        server = require('gulp-express'),
        exec = require('child_process').exec;

    gulp.task('default', function () {
        // gulp.run('hint');
        gulp.run('server');
        gulp.watch(['gulpfile.js', 'app.js', 'config.js', 'app/**/*.js'], function () {
            // gulp.run('hint');
            gulp.run('server');
        });
    });

    // gulp.task('hint', function () {
    //     return gulp.src(['gulpfile.js', 'app.js', 'config.js', 'app/**/*.js'])
    //         .pipe(jshint({ node: true}))
    //         .pipe(jshint.reporter('jshint-stylish'));
    // });

    gulp.task('server', function () {
        server.run(['bin/www']);
    });
}());
