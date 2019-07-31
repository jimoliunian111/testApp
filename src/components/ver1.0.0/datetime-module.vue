<template>
  <div class="select-module">
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">{{title}}</div>
      <div class="product-info-form-item-content">
        <div @click="selectShow = true">{{dateValue || '请选择'}}</div>
        <div class="icon-style right-align"><i class="icon iconfont">&#xe609;</i></div>
      </div>
    </div>


    <van-popup v-model="selectShow" class="select-style" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :title="title"
        :visible-item-count="9"
        :min-date="minDate"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup, DatetimePicker } from 'vant';
export default {
  name: 'template-name',
  props: {
    title: {
      type: String
    },
    dateData: {
      type: Object
    },
    keyStr: {
      type: String
    }
  },
  data () {
    return {
      selectShow: false,
      currentDate: '',
      minDate: '',
      maxDate: '',
      dateValue: ''
    }
  },
  components: {
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
  },
  methods: {
    onConfirm (value) {
      console.log('55555', value.getTime())
      let date = value
      let year = date.getFullYear()
      let month = ('0' + (date.getMonth() + 1)).slice(-2)
      let day = ('0' + date.getDate()).slice(-2)
      this.dateValue = `${year}-${month}-${day}`
      this.$emit('getData', this.dateValue, this.keyStr)
      this.selectShow = false
    },
    onCancel() {
      this.selectShow = false
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;
    },
    setData () {
      this.dateValue = this.dateData.default
      this.currentDate = new Date(this.dateData.default)
      this.minDate = new Date(this.dateData.max)
      this.maxDate = new Date(this.dateData.min)
    }
  },
  created () {
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
.right-align {
  text-align: right;
}
</style>
