const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: process.env.NODE_ENV === "development",
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://example.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
    },
  },
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // 【InjectManifest】allows you to start with an existing service worker file, and creates a copy of that file with a "precache manifest" injected into it.
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
    },
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
        "~": path.join(__dirname, "./src/components"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 30000,
            },
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [],
    },
  },
});
