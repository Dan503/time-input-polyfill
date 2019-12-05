'use strict'

import path from 'path'
import gulp from 'gulp'
import { plugins, args, config, taskTarget, browserSync, join } from '../utils'

var dirs = config.directories
var dest = join(taskTarget)

gulp.task('copy:dist', function() {
	return gulp
		.src([join('dist/**/*')])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest([dest, 'scripts'].join('/')))
})

// Copy
gulp.task('copy', function() {
	return gulp
		.src([
			join(dirs.source, '**/*'),
			'!' + join(dirs.source, '{**/_*,**/_*/**}'),
			'!' + join(dirs.source, '**/*.pug'),
		])
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(dest))
})
