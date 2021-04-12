'use strict'

import gulp from 'gulp'
import { taskTarget } from '../utils'
import del from 'del'

// Clean
gulp.task('clean', () => del([taskTarget]))

const fileSet = (fileName, includeMjs = true) => {
	const cjsFiles = [`./${fileName}.js`, `./${fileName}.js.map`]
	const mjsFiles = [`./${fileName}.mjs`, `./${fileName}.mjs.map`]

	if (includeMjs) {
		return [...cjsFiles, ...mjsFiles]
	}

	return cjsFiles
}
export const npm_postPublish_clean = () => {
	return del([...fileSet('supportsTime'), ...fileSet('index.cjs', false)])
}
