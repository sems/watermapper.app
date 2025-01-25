module.exports = {
    server: {
        baseDir: './src',
        middleware: [
            function (req, res, next) {
                if (req.url.endsWith('index.html')) {
                    req.url = req.url.replace('index.html', 'index.htm');
                }
                next();
            }
        ],
    },
    files: ['src/**/*'],
    single: false,
};