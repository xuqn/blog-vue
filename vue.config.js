const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
    },
    devServer: {
        open: true,
        // host: '127.0.0.1',
        port: 5000,
        https: false,
        hotOnly: false,
        proxy: null,
        before: app => {}
    },
}