module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    indent: ["error", 2],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-extra-semi": 2, //不允许出现不必要的分号
    // semi: [2, 'always'], //强制语句分号结尾
    "no-cond-assign": 2, //条件语句的条件中不允许出现赋值运算符
    "no-constant-condition": 2, //条件语句的条件中不允许出现恒定不变的量
    "no-control-regex": 2, //正则表达式中不允许出现控制字符
    "no-dupe-args": 2, //函数定义的时候不允许出现重复的参数
    "no-dupe-keys": 2, //对象中不允许出现重复的键
    "no-duplicate-case": 2, //switch语句中不允许出现重复的case标签
    "default-case": 2, //在switch语句中需要有default语句
    "no-empty": 2, //不允许出现空的代码块
    "no-ex-assign": 2, //在try catch语句中不允许重新分配异常变量
    "no-extra-boolean-cast": 2, //不允许出现不必要的布尔值转换
    "no-extra-parens": 0, //不允许出现不必要的圆括号
    "no-func-assign": 2, //不允许重新分配函数声明
    "no-irregular-whitespace": 2, //不允许出现不规则的空格
    "no-obj-calls": 2, //不允许把全局对象属性当做函数来调用
    "use-isnan": 2, //要求检查NaN的时候使用isNaN()
    "guard-for-in": 0, //监视for in循环，防止出现不可预料的情况
    // 'no-eq-null': 2, //不允许对null用==或者!=
    "no-extend-native": 2, //不允许扩展原生对象
    "no-loop-func": 2, //不允许在循环语句中进行函数声明
    "no-multi-spaces": 2, //不允许出现多余的空格
    "no-redeclare": 2, //不允许变量重复声明
    "no-self-compare": 2, //不允许变量自己和自己比较
    "no-unused-expressions": 2, //不允许无用的表达式
    "no-label-var": 2, //不允许标签和变量同名
    "no-var": 0, //使用let和const代替var
    "no-trailing-spaces": 2, //一行最后不允许有空格
    "@typescript-eslint/no-var-requires": "off",
    // "max-len": '80', //一行最大长度，单位为字符
    "quote-props": 0, //对象字面量中属性名加引号
    quotes: [0, "double", "avoid-escape"], //引号风格
    "space-before-blocks": [2, "always"], //块前的空格
    "key-spacing": [2, { beforeColon: false, afterColon: true }], //对象字面量中冒号的前后空格
    "semi-spacing": [2, { before: false, after: true }], //分后前后空格
    "space-before-function-paren": [2, { anonymous: "always", named: "never" }], //函数定义时括号前的空格
    "space-infix-ops": [2, { int32Hint: true }], //操作符周围的空格
    "keyword-spacing": 2, //关键字前后的空格
    "generator-star-spacing": [2, "both"], //生成器函数前后空格
    "comma-spacing": ["error", { before: false, after: true }],
    "no-dupe-else-if": 2,
  },
};
