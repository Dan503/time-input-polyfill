'use strict'

import gulp from 'gulp'
import { plugins, config, taskTarget, join } from '../utils'

var dirs = config.directories


gulp.task('copy:dist', function () {
	return gulp
		.src([join('dist/**/*')])
		.pipe(plugins.changed(taskTarget))
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
		.pipe(plugins.changed(taskTarget))
		.pipe(gulp.dest(taskTarget))
})
