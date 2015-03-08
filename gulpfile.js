/**
 * Created by quintonsheppard on 03/02/15.
 */

var gulp = require('gulp'),
    html2js = require('gulp-ng-html2js'),
    concat = require('gulp-concat'),
    bowerSrc = require('gulp-bower-src'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    jsdoc = require('gulp-jsdoc'),
    sass = require('gulp-sass'),
    es = require('event-stream'),
    minifycss = require('gulp-minify-css'),
    ngAnnotate = require("gulp-ng-annotate"),
    livereload = require('gulp-livereload'),
    del = require('del'),
    ngdocs = require('gulp-ngdocs'),
    karma = require('karma').server;

var config = {
    templateModuleName: 'MyApp',
    cssMinify: {
        advanced: false,
        aggressiveMerging: false,
        keepBreaks: false,
        rebase: false
    }
}

/**
 * Run all the tests and watch for file changes (as per karma.conf.js file setup)
 **/
gulp.task('test', function(done){
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

// clean the build folder
gulp.task('clean', function(cb){
    del(['build'], cb);
});

gulp.task('express', function(){
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname));
    app.listen(4000);
})

// copy vendor specific files to build
gulp.task('bower', function(){
    return bowerSrc().pipe(gulp.dest('./build/vendor'));
});

// copy all fonts over
gulp.task('fonts', function(){
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./build/fonts'));
});

// copy all images
gulp.task('images', function(){
    return gulp.src('./src/images/**')
        .pipe(gulp.dest('./build/images'));
});

// process sccs files TODO: minify
gulp.task('styles', function(){
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css'));
})

// processing angular templates/views
gulp.task('html', function(){
   return es.concat(

       gulp.src('./src/index.html')
           .pipe(gulp.dest('./build')),

       gulp.src(['./src/views/*.html', './src/views/**/*.html'])
       .pipe(html2js({
           moduleName: config.templateModuleName,
           declareModule: false
       }))
       .pipe(concat('templates.js'))
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('./build/js'))
   )
});

// script tasks TODO: add in concat, minify, rename (.min.js), uglify
gulp.task('scripts', function(){
    return es.concat(
        gulp.src(['./src/js/*.js', './src/js/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(ngAnnotate())
            .pipe(concat('app.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./build/js')),
        gulp.src('./src/js/data/*.json')
            .pipe(gulp.dest('./build/js/data'))//,
        //gulp.src(['./src/js/*.js', './src/js/**/*.js'])
            //.pipe(ngdocs.process())
            //.pipe(gulp.dest('./docs/js'))
    )
});

gulp.task('docs', function(){
    return gulp.src(['./src/js/*.js', './src/js/**/*.js'])
        .pipe(ngdocs.process())
        .pipe(gulp.dest('./docs/js'))
});

/*gulp.task('angular-doc', shell.task([
    'node node_modules/angular-jsdoc/node_modules/jsdoc/jsdoc.js' +
    ' -c node_modules/angular-jsdoc/conf.json ' +
    ' -t node_modules/angular-jsdoc/template ' +
    ' -d docs/js ' +
    ' -r src/js'
]));*/

// build task
gulp.task('build', ['html', 'styles', 'scripts', 'images', 'fonts', 'bower', 'docs']);

// default task build + clean
gulp.task('default', ['clean'], function(){
   gulp.start('build');
});

// watch files for changes and react
gulp.task('watch', function(){
    gulp.watch('./src/fonts/**', ['fonts']);
    gulp.watch('./src/images/**', ['images']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch(['./src/scss/**/*.scss', './src/scss/*.scss'], ['styles']);
    gulp.watch(['./src/views/**/*.html', './src/index.html'], ['html']);
    gulp.watch('./bower/**', ['bower']);
});
