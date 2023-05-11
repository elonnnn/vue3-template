const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const multipageConfig = require("./multi.config.js");

console.log(multipageConfig.process);
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: multipageConfig.process.outputDir,
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: process.env.NODE_ENV === "development",
  pages: multipageConfig.process.pages,
  devServer: {
    port: multipageConfig.process.port,
    proxy: multipageConfig.process.proxyTable,
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
    },
  },
  pwa: multipageConfig.process.pwa,
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
        "~": path.join(__dirname, "./src/components"),
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: `src/${multipageConfig.process.name}/public`,
            to: "./",
          },
        ],
      }),
    ],
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
      minimizer: [
        new TerserPlugin({
          parallel: true,
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
  },
});
