const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
};
// 线上打包路径，请根据项目实际线上情况
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : './';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: BASE_URL,

    // 打包生成的生产环境构建文件的目录
    outputDir: 'dist',

    // 放置生成的静态资源路径，默认在outputDir
    assetsDir: './',

    // 指定生成的 index.html 输入路径，默认outputDir
    indexPath: 'index.html',

    // 构建多页
    pages: undefined,
    // 开启 生产环境的 source map?
    productionSourceMap: false,
    chainWebpack: config => {
        // 配置路径别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
    },
    css: {
        requireModuleExtension: false,
        // modules: false, // 启用 CSS modules  "css.modules" option in vue.config.js is deprecated now, please use "css.requireModuleExtension" instead.
        extract: false, // 是否使用css分离插件
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {} // css预设器配置项
    },
    devServer: {
        port: 8080, // 端口
        // proxy: {
        //     // proxy all requests starting with /api to jsonplaceholder
        //     '/api': {
        //         target: 'http://172.47.17.230:8080/',   //代理接口
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '/'    //代理的路径
        //         }
        //     }
        // }
    },
    pluginOptions: {
      i18n: {
        locale: 'cn',
        fallbackLocale: 'cn',
        localeDir: 'cn',
        enableInSFC: true
      }
    },
    configureWebpack: config => {
        if (isProduction) {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            config.optimization.minimizer[0].options.terserOptions.keep_fnames = true;
        }
    }
};
