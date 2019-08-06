<template>
  <div>
    <div class="insure-item-style">
      <div class="left-style">{{title}}</div>
      <div class="right-style">
        <div class="datetime-box-style" v-if="type === 'check'">
          <div class="datetime-value-style" @click="showDatePopup">{{dateValue === '' ? `请选择${title}` : dateValue}}</div>
          <div class="datetime-icon-style">
            <span class="icon iconfont">&#xe60f;</span>
          </div>
        </div>
        <div class="datetime-box-style" v-if="type === 'onlyread'">
          <div class="datetime-value-style">{{dateValue || ''}}</div>
          <div class="datetime-icon-style">
            <!-- <span class="icon iconfont">&#xe60f;</span> -->
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" class="datetime-popup-style" round>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :title="title"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
  
</template>

<script>
import { DatetimePicker, Popup } from 'vant'
export default {
  name: 'insure-datetime-module',
  props: {
    type: {
      type: String,
      default: 'onlyread' // check or onlyread
    },
    title: {
      type: String
    },
    keyStr: {
      type: String
    },
    value: {
      type: String
    },
    max: {
      type: String
    },
    min: {
      type: String
    }
  },
  data () {
    return {
      show: false,
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
    showDatePopup () {
      this.show = true
    },
    onConfirm (value) {
      console.log('55555', value.getTime())
      let date = value
      let year = date.getFullYear()
      let month = ('0' + (date.getMonth() + 1)).slice(-2)
      let day = ('0' + date.getDate()).slice(-2)
      this.dateValue = `${year}-${month}-${day}`
      this.$emit('getData', this.dateValue, this.keyStr)
      this.show = false
    },
    onCancel() {
      this.show = false
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
      this.dateValue = this.value
      this.currentDate = new Date('2019-08-01' || this.value)
      this.minDate = new Date(this.min)
      this.maxDate = new Date(this.max)
    }
  },
  created () {
    this.setData()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
.datetime-popup-style {
  width: 100%;
  height: rem(650);
}
</style>
