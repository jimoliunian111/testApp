<template>
  <div class="insure-item-style">
    <div class="left-style">{{title}}</div>
    <div class="right-style">
      <div class="insure-checked-box">
        <div class="insure-check-item"
          :class="{'insure-active-style': item.value === checked}"
          v-for="(item, idx) in list" 
          :key="idx"
          @click="certificateCheck(item)">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'insure-check-module',
  props: {
    title: {
      type: String,
      required: true
    },
    keyStr: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    active: {
      type: [Number, String]
    }
  },
  data () {
    return {
      checked: null
    }
  },
  methods: {
    certificateCheck (item) {
      this.checked = item.value
      this.$emit('getData', this.checked, this.keyStr)
    }
  },
  created () {
    this.checked = this.active
  },
  computed: {
    // checked () {
    //   return this.active
    // }
  }
}
</script>

