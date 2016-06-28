/**
 * Created by n0212893 on 6/27/2016.
 */

const gulp = require('gulp');
const semver = require('semver');
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
const webserver = require('gulp-webserver');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const karma = require('gulp-karma-runner');
const webpack = require('webpack-stream');
const del = require('del');
const DIST = 'dist';


//clean
gulp.task('clean', function() {
    console.log ('removing DIST directory');
    return del([
        'DIST'
    ]);
});

//webpack
gulp.task('webpack', function() {
   return gulp.src('src/scripts/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('DIST/scripts/'));
});

//copy
gulp.task('copy', function () {
    return gulp.src('src/*.html').pipe(gulp.dest(DIST));
});

//run webserver
gulp.task('run', function () {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 3000,
            https: true
        }));
});

//build
gulp.task('build', gulp.series(gulp.parallel('clean','webpack','copy'),['run'], function(done) {
    console.log('webpack cleanup OK');
    done();
}));

//start karma server
gulp.task('karma', function() {
   return gulp.src([
       'spec/**/*.js'
   ],
   {'read': false}).pipe(
        karma.server({
            configFile: __dirname + '/karma.conf.js',
            'singleRun': false
        })
    );
});

//run tests in karma
gulp.task('test', function () {
    return gulp.src([
        'spec/**/*.js',
        'src/**/*.js'
    ],
        {'read': false}).pipe(
        karma.runner({
            configFile: __dirname + '/karma.conf.js',
            'singleRun': false
        })
    );
});

//jasmine test
gulp.task('jasmine', function(done) {
  gulp.src('spec/*.js')
    .pipe(jasmine({
        reporter: new reporters.TerminalReporter({
          verbosity: 3,
          color: true
        })
    }));
    done();
});

//eslint
gulp.task('eslint', function () {
    return gulp.src(['**/*.js','!node_modules/**','!karma.conf.js','!dist/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

//check node version task
gulp.task('version', function (done) {
    console.log("Checking node version:");

    const actualVersion = process.version;
    const packageJson = require('./package.json');
    const expectedVersion = packageJson.engines.node;


    if (semver.gt(expectedVersion,actualVersion)) {
        console.log('Incorrect node version. Expected ' +
        expectedVersion + '. Actual: ' + actualVersion);
        process.exit(1);
    } else {
        console.log('Node Version:' + actualVersion);
    }
    done();
});

//Check for code style errors using Lint
gulp.task('lint', function () {
    console.log('Linting JavaScript: ');
    return gulp.src(['gulpfile.js','src/**/*.js'])
    .pipe(jshint({
            esversion: 6,
            node: true,
            browser: true,
            globals: [],
            eqeqeq: true
        }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

//default task
gulp.task('default', gulp.series(gulp.parallel('version','eslint','lint'),['jasmine','test'], function (done) {
    console.log('BUILD OK');
    done();
}));
