var gulp = require('gulp');
var rsync = require('gulp-rsync');
 
gulp.task('deploy', function() {
    gulp.src([
        './**',
        '!node_modules{,/**}'
    ])
    .pipe(rsync({
        hostname: 'misha',
        destination: '/home/egor/www/clickManager',
        incremental: true,
        progress: true
    }));
});