# 移动端适配

### 安装amfe-flexible和postcss-px2rem
```
npm install amfe-flexible postcss-pxtorem --save-dev
```

amfe-flexible 自动动态给html,body标签设置font-size值
postcss-px2rem会将px转换为rem，rem单位用于适配不同宽度的屏幕，根据标签的font-size值来计算出结果，1rem=html标签的font-size值

### 在入口main.ts中 引入 lib-flexible

```
import "amfe-flexible";
```

### 在根目录的index.html 的头部加入手机端适配的meta代码

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
```


### 配置 postcss.config.js

```
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

```

### [配置参考链接](http://vuepress.wmm66.com/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/other/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%80%82%E9%85%8D%E6%96%B9%E6%A1%88.html#rem-%E9%80%82%E9%85%8D%E4%B9%8B-px2rem-loader)


