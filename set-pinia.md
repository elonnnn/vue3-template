# Pinia的使用姿势【options】或者【setup】

### 安装pinia和pinia-plugin-persist
```
npm install pinia pinia-plugin-persist --save
```
### options示例 src/stores/options
```
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ["count"],
      },
    ],
  },
});

```
### setup示例 src/stores/setup
```
import { defineStore } from "pinia";
import { ref } from "vue";

// ref() 就是 state 属性
// computed() 就是 getters
// function() 就是 actions

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    function increment() {
      count.value++;
    }

    return { count, increment };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage, // 默认是sessionStorage
          paths: ["count"],
        },
      ],
    },
  }
);

```


### pinia-plugin-persist本地持久化 src/stores/index
```
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

const store = createPinia();
store.use(piniaPluginPersist);

export default store;

```

### main.ts

```
import store from "./stores";
....
app.use(store)...
...
```

### page中使用 src/views/Pinia.vue

```
<template>
  <div>count: {{ count }}</div>
  <div @click="increment">Click to Increment</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/setup";
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore();
// `count`是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { count } = storeToRefs(store);
// 作为 action 的 increment 可以直接解构
const { increment } = store;
</script>
<style lang="less" scoped></style>

```

[pinia官方文档](https://pinia.vuejs.org/zh/introduction.html)
[pinia本地持久化pinia-plugin-persist 资料](https://seb-l.github.io/pinia-plugin-persist/)