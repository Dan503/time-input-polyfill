'use strict'

import gulp from 'gulp'
import { taskTarget } from '../utils'
import del from 'del'

// Clean
gulp.task('clean', () => del([taskTarget]))

export const npm_postPublish_clean = () => {
	return del([
		'./supportsTime.js',
		'./supportsTime.js.map',
		'./supportsTime.mjs',
		'./supportsTime.mjs.map',
	])
}
