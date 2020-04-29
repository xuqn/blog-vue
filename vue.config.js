const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
  baseUrl: './',
  productionSourceMap: false,
  lintOnSave: true,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
  },
  devServer: {
    open: true,
    port: 5000,
    https: false,
    hotOnly: false,
    proxy: null,
    before: (app) => {},
  },
};
