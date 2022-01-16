'use strict'

import gulp from 'gulp'
import { taskTarget } from '../utils'
import del from 'del'

// Clean
gulp.task('clean', () => del([taskTarget]))

const fileSet = (fileName: string, extensions: Array<string | Array<string>>) => {
	return extensions.flatMap((ext) => [
		`./${fileName}.${ext}`,
		`./${fileName}.${ext}.map`,
	])
}
export const npm_postPublish_clean = () => {
	return del([
		...fileSet('supportsTime', ['js', 'mjs']),
		...fileSet('index.cjs', ['js']),
		...fileSet('auto', ['js']),
	])
}
