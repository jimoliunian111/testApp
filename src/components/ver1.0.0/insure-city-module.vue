<template>
  <div class="city-module">

    <div class="insure-item-style">
      <div class="left-style">{{title}}</div>
      <div class="right-style">
        <div class="city-box-style">
          <div class="city-value-style" @click="show = true">{{cityName || '请选择'}}</div>
          <div class="city-icon-style">
            <span class="icon iconfont">&#xe60f;</span>
          </div>
        </div>
      </div>
    </div>


    <van-popup v-model="show" class="select-style" position="bottom">
      <van-area :area-list="cityData"
      :columns-num="3"
      :value="active"
      :visible-item-count="9"
      :title="title"
      @confirm="onConfirm"
      @cancel="onCancel"/>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Area } from 'vant';
import cityData from '@/mocks/cityData.js'
export default {
  name: 'template-name',
  props: {
    title: {
      type: String
    },
    name: {
      type: String
    },
    active: {
      type: String, // 城市code的最后一级的code 或者 id （匹配得上list里每一项的值就好，id 或者 code）
      default: '440105' // 广东省-广州市-海珠区， 即：对应海珠区的编码就是440105
    },
    leavel: {
      type: Number, // 城市等级， 兼容某些产品只要2级城市
      default: 3
    }
  },
  data () {
    return {
      show: false,
      cityData: cityData,
      cityName: ''
    }
  },
  components: {
    [Popup.name]: Popup,
    [Area .name]: Area
  },
  methods: {
    onConfirm (data) {
      console.log('789789798', data)
      let arr = []
      data.map(item => {
        arr.push(item.name)
      })
      this.cityName = arr.join('-')
      this.$emit('getData', data, this.cityName)
      this.show = false
    },
    onCancel () {
      this.show = false
    }
  },
  created () {
    this.cityName = this.name
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
</style>
