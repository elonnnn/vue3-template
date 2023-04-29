# 一：加速js/css打包构建

```
npm install terser-webpack-plugin css-minimizer-webpack-plugin --save-dev
```


```
// vue.config.js
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = defineConfig({
  // .....
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多进程并行提升打包速度，默认值为 cpu 核心数减 1
        terserOptions: {
          toplevel: true,
          ie8: true,
          safari10: true,
        },
      }),
      new CssMinimizerPlugin({
          parallel: true,
          minimizerOptions: {
            preset: "advanced",
          },
        }),
    ],
  },
})
```

[terser-webpack-plugin中文文档](https://drylint.com/Webpack/terser-webpack-plugin.html#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)


# 二：image无损优化

```
npm image-minimizer-webpack-plugin --save-dev

// 推荐的imagemin插件进行无损优化
npm install imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```


```
// vue.config.js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = defineConfig({
  // .....
  optimization: {
    minimize: true,
    minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
              ],
            },
          },
        }),
    ],
  },
})
```
[image-minimizer-webpack-plugin配置参考](https://runebook.dev/zh/docs/webpack/plugins/image-minimizer-webpack-plugin)


# 三：html-webpack-externals-plugin，externals（CDN方式引入JS）

### 方式一 使用html-webpack-externals-plugin

首先npm 安装html-webpack-externals-plugin，如下代码：
```
npm i html-webpack-externals-plugin -D
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = defineConfig({
    // 其它省略...
    plugins: [
        new HtmlWebpackExternalsPlugin({
          externals: [{
            module: 'vue',
            entry: 'https://lib.baomitu.com/vue/2.6.12/vue.min.js',
            global: 'Vue'
          }]
        })
    ],
    // 其它省略...
})
```

### 方式二：直接配置externals

首先在index.html中script标签引入JS，如下代码：

```

<script type="text/javascript" src="https://lib.baomitu.com/vue/2.6.12/vue.min.js"></script>

```

vue.config.conf.js的配置如下：

```
module.exports = defineConfig({
    // 其它省略...
    externals: {
        vue: 'Vue'
    },
    // 其它省略...
})
```


[参考链接1](https://webpack.docschina.org/configuration/externals/)
[参考链接2](https://www.cnblogs.com/moqiutao/p/13744854.html)