var dest = './dist';
var src = './src';
var gutil = require('gulp-util');
var modrewrite = require('connect-modrewrite');

var apiMiddleware = function(apiUrl) {
    return [
        modrewrite([
            '^/api/(.*)$ ' + apiUrl + '$1 [P]'
        ])
    ];
};
var apiConnect = function(apiUrl) {
    connect.server({
        root: './dist/',
        port: 8081,
        livereload: true,
        middleware: function(connect, opt) {
            return apiMiddleware(apiUrl);
        }
    });
};

module.exports = {
    server: {
        settings: {
            root: dest,
            host: 'localhost',
            port: 8080,
            livereload: {
                port: 35929
            },
            middleware: function(connect, opt) {
                return apiMiddleware('https://localhost:4433/api/');
            }
        }
    },
    sass: {
        src: src + '/styles/**/*.{sass,scss,css}',
        dest: dest + '/styles',
        settings: {
            indentedSyntax: false, // Enable .sass syntax?
            imagePath: '/images' // Used by the image-url helper
        }
    },
    browserify: {
        settings: {
            transform: ['babelify', 'reactify']
        },
        src: src + '/js/index.jsx',
        dest: dest + '/js',
        outputName: 'index.js',
        debug: gutil.env.type === 'dev'
    },
    html: {
        src: 'src/index.html',
        dest: dest
    },
    watch: {
        src: 'src/**/*.*',
        tasks: ['build']
    }
};
