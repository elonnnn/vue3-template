

### 安装copy-webpack-plugin
```
npm install copy-webpack-plugin --save-dev

```

### multi.config.js
```
const argvs = process.argv.slice(2);

function getParams(key) {
  let item = argvs.find((item) => item.split("=")[0] === key);
  return item ? item.split("=") : [];
}

class MultiModule {
  constructor(name, opts) {
    Object.assign(
      this,
      {
        name,
        port: 8080,
        outputDir: `dist/${name}`,
        proxyTable: null,
        pages: {
          [name]: {
            entry: `src/${name}/main.ts`,
            template: `src/${name}/index.html`,
            filename: "index.html",
            title: opts.appName,
          },
        },
      },
      opts
    );
  }
}

function getModuleProcess(name) {
  let mItem = importModules.find((item) => item.name === name);
  return mItem || importModules[0];
}

function getProxyConfig(target, options) {
  return Object.assign(
    {
      target,
      changeOrigin: true,
      ws: false,
      pathRewrite: { "^/api": "" },
    },
    options
  );
}

const PROXY_DOMAIN_DEFAULT = "http://www.baidu.com";

// 多模块独立配置
var importModules = [
  new MultiModule("apple", {
    port: 8091,
    appName: "苹果",
    pwa: {
      name: "苹果",
      themeColor: "#4DBA87",
      msTileColor: "#000000",
      appleMobileWebAppCapable: "yes",
      appleMobileWebAppStatusBarStyle: "black",
      // 【InjectManifest】allows you to start with an existing service worker file, and creates a copy of that file with a "precache manifest" injected into it.
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
        swSrc: "./src/banana/service-worker.js",
      },
    },
    proxyTable: {
      "/api": getProxyConfig(PROXY_DOMAIN_DEFAULT),
    },
  }),
  new MultiModule("banana", {
    port: 8092,
    appName: "香蕉",
    pwa: {
      name: "香蕉",
      themeColor: "#4DBA87",
      msTileColor: "#000000",
      appleMobileWebAppCapable: "yes",
      appleMobileWebAppStatusBarStyle: "black",
      // 【InjectManifest】allows you to start with an existing service worker file, and creates a copy of that file with a "precache manifest" injected into it.
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
        swSrc: "./src/banana/service-worker.js",
      },
    },
    proxyTable: {
      "/api": getProxyConfig(PROXY_DOMAIN_DEFAULT),
    },
  }),
];
var lifecycleEvents = String(process.env.npm_lifecycle_event).split(":");
var moduleName = getParams("name")[1] || lifecycleEvents[1];

const multiConfig = {
  modules: importModules,
  process: getModuleProcess(moduleName),
};

module.exports = multiConfig;

```

### vue.config.js
```
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const multipageConfig = require("./multi.config.js");

module.exports = defineConfig({
  // ....修改如下
  outputDir: multipageConfig.process.outputDir,
  pages: multipageConfig.process.pages,
  devServer: {
    port: multipageConfig.process.port,
    proxy: multipageConfig.process.proxyTable,
  },
  pwa: multipageConfig.process.pwa,
  configureWebpack: {
    resolve: {
      alias: {
        // 添加
        ...multipageConfig.moduleAlias,
      },
    },
    plugins: [
      // 添加
      new CopyPlugin({
        patterns: [
          {
            from: `src/${multipageConfig.process.name}/public`,
            to: "./",
          },
        ],
      }),
    ],
  },
});

```

### package.json
```
"scripts": {
  "dev:apple": "vue-cli-service serve",
  "dev:banana": "vue-cli-service serve",
  "build:apple": "vue-cli-service build",
  "build:banana": "vue-cli-service build",
  // 打包所有
  "build": "npm run build:apple && npm run build:banana",
},
```
### to do list
// 启动所有需要shell新开终端