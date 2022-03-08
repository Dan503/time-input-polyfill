'use strict'

import gulp from 'gulp'

import { config, taskTarget, join } from '../utils'

var dirs = config.directories


gulp.task('copy:dist', function () {
	return gulp
		.src([join('dist/**/*')])
		.pipe(gulp.dest(join(taskTarget, 'scripts')))
})

// Copy
gulp.task('copy', function () {
	return gulp
		.src([
			join(dirs.source, '**/*'),
			'!' + join(dirs.source, '{**/_*,**/_*/**}'),
			'!' + join(dirs.source, '**/*.pug'),
		])
		.pipe(gulp.dest(taskTarget))
})
