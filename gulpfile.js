/**
 * Created by n0212893 on 6/27/2016.
 */

const gulp = require('gulp');
const semver = require('semver');

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
//default task
gulp.task('default', gulp.series('version', function (done) {
    console.log('BUILD OK');
    done();
});
