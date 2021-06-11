'use strict'
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin') // 用于在生成环境剔除debuger和console
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩,优化http请求,提高加载速度
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 代码分析工具

const resolve = dir => {
    return path.join(__dirname, dir)
}

// let target = process.env.VUE_APP_BASE_API;
const productionGzipExtensions = new RegExp("\\.(" + ["js", "css"].join("|") + ")$");

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            scss: {
                prependData: `@import "~@css/vue.scss";`
            }
        }
    },
    // webpack相关配置
    chainWebpack: (config) => {
        config.entry.app = ['./src/main.js']
        config.resolve.alias
            // .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('@views', resolve('src/views'))
            .set('@css', resolve('src/assets/css'))
            .set('@api', resolve('src/api'))
            .set('@servers', resolve('src/servers'))
            .set('@utils', resolve('src/utils'))
            .set('@default-methods', resolve('src/utils/axios.js'))
            .set('@store', resolve('src/store'))
            .set('@reg', resolve('src/utils/regular.config.js'))
            .set('@validator', resolve('src/utils/validator.js'))
        config.performance
            .set('hints', false)
        //     // 移除 prefetch 插件
        config.plugins.delete("prefetch");
        // // 移除 preload 插件
        config.plugins.delete('preload');
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        })
        // 对图片进行压缩处理
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                disable: true,
                quality: '65-80',
                speed: 4
            })
            .end()
        // 项目文件大小分析 调试打包文件大小时放开，方便调试
        // config.plugin('webpack-bundle-analyzer')
        //     .use(new BundleAnalyzerPlugin({
        //         // openAnalyzer: false,
        //     }))
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log']
                    }
                }
            })
            config.plugins.push(new CompressionPlugin({
                filename: info => {
                    return `${info.path}.gz${info.query}`
                },
                algorithm: 'gzip',
                test: productionGzipExtensions, // 匹配文件扩展名
                threshold: 10240, // 对超过10k的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets: false
            }))
        }
    }


}
