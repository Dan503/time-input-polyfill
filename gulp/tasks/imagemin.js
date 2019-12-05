'use strict'

import gulpif from 'gulp-if'
import pngquant from 'imagemin-pngquant'
import gulp from 'gulp'
import { plugins, args, config, taskTarget, browserSync, join } from '../utils'

let dirs = config.directories
let dest = join(taskTarget, dirs.images.replace(/^_/, ''))

// Imagemin
gulp.task('imagemin', () => {
	return gulp
		.src('**/*.{jpg,jpeg,gif,svg,png}', {
			cwd: join(dirs.source, dirs.images),
		})
		.pipe(plugins.changed(dest))
		.pipe(
			gulpif(
				args.production,
				plugins.imagemin(
					[
						plugins.imagemin.jpegtran({ progressive: true }),
						plugins.imagemin.svgo({
							plugins: [{ removeViewBox: false }],
						}),
					],
					{ use: [pngquant({ speed: 10 })] },
				),
			),
		)
		.pipe(gulp.dest(dest))
})
