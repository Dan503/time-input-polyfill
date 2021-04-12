'use strict'

import gulp from 'gulp'
import glob from 'glob'
import { args } from './gulp/utils'

import { npm_postPublish_clean } from './gulp/tasks/clean'
import { npm_rollup_supportsTime } from './gulp/tasks/rollup'

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
glob.sync('./gulp/tasks/**/*.js')
	.filter(function (file) {
		return /\.(js)$/i.test(file)
	})
	.map(function (file) {
		require(file)
	})

const production_mode_on = (done) => {
	args.production = true
	done()
}

// Build production-ready code
gulp.task(
	'build',
	gulp.series(
		production_mode_on,
		gulp.parallel('copy', 'imagemin', 'pug', 'sass', 'rollup'),
		'rev'
	)
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
			'watch'
		)
	)
)

// Default task
gulp.task('default', gulp.series('clean', args.production ? 'build' : 'serve'))

// Testing
gulp.task('test', gulp.series('eslint'))

// NPM publishing
gulp.task('pre-publish', gulp.parallel(npm_rollup_supportsTime))
gulp.task('post-publish', gulp.parallel(npm_postPublish_clean))
