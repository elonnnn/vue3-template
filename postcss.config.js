module.exports = {
  plugins: {
    autoprefixer: {
      Browserslist: ["Android >= 4.0", "iOS >= 7"],
    },
    "postcss-pxtorem": {
      rootValue: 37.5, //根据设计稿宽度除以10进行设置，假设设计稿为375，即rootValue设为37.5
      propList: ["*"],
    },
  },
};
