'use strict'

import gulp from 'gulp'
import glob from 'glob'
import { KarmaServer, args } from './gulp/utils'

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
glob.sync('./gulp/tasks/**/*.js')
	.filter(function(file) {
		return /\.(js)$/i.test(file)
	})
	.map(function(file) {
		require(file)
	})

const production_mode_on = done => {
	args.production = true
	done()
}

// Build production-ready code
gulp.task(
	'build',
	gulp.series(
		production_mode_on,
		gulp.parallel('copy', 'imagemin', 'pug', 'sass', 'rollup'),
		'rev',
	),
)

// Server tasks with watch
gulp.task(
	'serve',
	gulp.series(
		gulp.parallel(
			'imagemin',
			'copy',
			'pug',
			'sass',
			'rollup',
			'browserSync',
			'watch',
		),
	),
)

// Default task
gulp.task('default', gulp.series('clean', args.production ? 'build' : 'serve'))

// Testing
gulp.task('test', gulp.series('eslint'))
