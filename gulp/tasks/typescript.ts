import { task, src, dest } from 'gulp'
import ts from 'gulp-typescript'

task('ts', function () {
	return src('./index.ts').pipe(ts({
		outFile: 'test.js',
		module: 'amd',
		moduleResolution: 'node',
		declaration: true,
	})).pipe(dest('dist'))
})
