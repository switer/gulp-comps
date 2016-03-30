'use strict'

var gulp = require('gulp')
var CompStream = require('../index')
var fs = require('fs')
// var comps = require('comps')


gulp.task('default', function() {
	return gulp.src(['./asserts/index.html'])
			   .pipe(CompStream())
			   .pipe(gulp.dest('dist'))
})