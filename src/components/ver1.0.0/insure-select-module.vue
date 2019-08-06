<template>
  <div class="select-module">
    <div class="insure-item-style">
      <div class="left-style">{{title}}</div>
      <div class="right-style" v-if="!type">
        <div class="select-box-style">
          <div class="select-value-style" @click="selectShow = true">{{activeObj && activeObj.label || '请选择'}}</div>
          <div class="select-icon-style">
            <span class="icon iconfont">&#xe60f;</span>
          </div>
        </div>
      </div>
      <div class="right-style" v-if="type === 'check'">
        <div class="insure-checked-box">
          <div class="insure-check-item"
            :class="{'insure-active-style': activeObj.value === item.value}"
            v-for="(item, idx) in list" 
            :key="idx"
            @click="checkFunc(item)">{{item.label}}</div>
        </div>
      </div>
    </div>


    <van-popup v-model="selectShow" class="insure-select-style" position="bottom">
      <van-picker
        show-toolbar
        :title="title"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker } from 'vant';
export default {
  name: 'template-name',
  props: {
    title: {
      type: String
    },
    list: {
      type: Array
    },
    active: {
      type: [ String, Number ]
    },
    keyStr: {
      type: String
    },
    type: {
      type: String // select  or  chheck
    }
  },
  data () {
    return {
      selectShow: false,
      columns: [],
      activeObj: {}
    }
  },
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  methods: {
    checkFunc (item) {
      this.activeObj = item
      this.$emit('getData', this.activeObj, this.keyStr)
    },
    onConfirm (value, index) {
      console.log('55555', value, index)
      this.activeObj = this.list.find(item => item.label === value )
      this.$emit('getData', this.activeObj, this.keyStr)
      this.selectShow = false
    },
    onCancel() {
      this.selectShow = false
    },
    setData () {
      this.list.map((item) => {
        this.columns.push(item.label)
      })
    },
    getActiveObj () {
      this.activeObj = this.list.find(item => +item.value === this.active )
    }
  },
  created () {
    this.getActiveObj()
    this.setData()
  },
  computed: {

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.insure-select-style {
  width: 100%;
  // height: rem(400);
}
</style>
