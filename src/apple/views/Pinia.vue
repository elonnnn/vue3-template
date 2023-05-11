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
