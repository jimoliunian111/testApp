<template>
  <div class="insure-item-style">
    <div class="left-style">{{title}}</div>
    <div class="right-style">
      <van-field v-model="value" :placeholder="warn" :error="error"/>
    </div>
  </div>
</template>

<script>
import { Field } from 'vant'
export default {
  name: 'insure-input-module',
  props: {
    title: {
      type: String,
      required: true
    },
    keyStr: {
      type: String
    },
    value: {
      type: String
    },
    warn: {
      type: String
    },
    error: {
      type: Boolean
    }
  },
  components: {
    [Field.name]: Field
  }
}
</script>

<style lang="scss">
// @import '@/assets/styles/common.scss';
</style>
