/*eslint no-process-exit:0 */

'use strict'

import gulpif from 'gulp-if'
import gulp from 'gulp'
import esLint from 'gulp-eslint-new'
import { config, browserSync } from '../utils'

let dirs = config.directories

// ESLint
gulp.task('eslint', () => {
	return gulp
		.src(
			[
				'../gulpfile.babel',
				'**/*',
				// Ignore all vendor folder files
				'!**/vendor/**/*',
			],
			{ cwd: dirs.source }
		)
		.pipe(browserSync.reload({ stream: true }))
		.pipe(
			esLint({
				useEslintrc: true,
			})
		)
		.pipe(esLint.format())
		.pipe(gulpif(!browserSync.active, esLint.failAfterError()))
		.on('error', function () {
			if (!browserSync.active) {
				process.exit(1)
			}
		})
})
