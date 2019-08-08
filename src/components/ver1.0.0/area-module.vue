<template>
  <div class="area-module">
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">{{title}}</div>
      <div class="product-info-form-item-content">
        <div @click="showFunc">{{showStr || '请选择'}}</div>
      </div>
    </div>


    <van-popup v-model="areaShow" class="area-popup-style" position="bottom">
      <div class="area-module-popup-header">
        <div class="left-style"></div>
        <div class="title-style">{{title}}</div>
        <div class="right-style"></div>
      </div>
      <div class="area-checked-tabs">
        <div class="area-checked-item" :class="{'area-checked-active': item.count === tabActive}"
        v-for="(item, idx) in tabs" :key="idx" @click="choseLeavel(item.count)">{{item.name}}</div>
      </div>
      <div class="area-check-list">
        <div class="area-check-list-item" v-for="(item, idx) in totalList[count]" :key="idx" @click="cityClick(item)">{{item.name}}</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Area, Tab, Tabs } from 'vant';
import { getAreaList } from '@/api/index.js'
export default {
  name: 'area-module',
  props: {
    title: {
      type: String
    },
    default: {
      type: String
    },
    id: {
      type: Number,
      default: 149
    },
    keyStr: {
      type: String,
      default: ''
    },
    leavel: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      areaShow: false,
      cityName: '',
      tabs: [
        {name: '请选择', count: 0}
      ],
      count: 0,
      totalList: [],
      checked: [],
      showStr: '',
      tabActive: 0
    }
  },
  components: {
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  methods: {
    getData (item) {
      let params = {
        product_id: this.id
      }
      if (item) {
        let obj = {
          parent_id: item.id
        }
        params = {...params, ...obj}
      }
      let that = this
      getAreaList(params).then(res => {
        console.log('城市数据请求成功', res)
        if (item) {
          this.setStr()
          that.$set(that.checked, that.count, item) // 选中的数组
          that.setTabs(item)
          that.count = that.count + 1
        }
        that.$set(that.totalList, that.count, res.data) // 总渲染数组
        if (that.count === that.leave) {
          that.closeFunc()
        }
      }).catch(res => {
        console.log('城市数据请求失败', res)
      })
    },
    setTabs (item) {
      // 先添加空的
      // 再添加赋值的
      let obj = {
        name: item.name,
        count: this.tabActive
      }
      this.$set(this.tabs, this.tabActive, obj)
      if (this.tabActive < 2) {
        let newObj = {
          name: '请选择',
          count: this.tabActive + 1
        }
        this.tabActive += 1
        this.$set(this.tabs, this.tabActive, newObj)
      }
    },
    rest () {
      this.count = 0
      this.tabActive = 0
      this.totalList = []
    },
    choseLeavel (idx) {
      this.count = idx
      this.tabActive = idx
      this.tabs[this.tabActive].name = '请选择'
      this.tabs.map(item => {
        if (item.count > this.tabActive) {
          item.name = '请选择'
          this.$set(this.totalList, item.count, [])
        }
      })
    },
    cityClick (item) {
      this.getData(item)
    },
    showFunc () {
      this.areaShow = true
      this.rest()
      this.getData()
    },
    closeFunc () {
      this.$emit('getData', this.checked, this.showStr, this.keyStr)
      this.areaShow = false
    },
    setStr () {
      let arr = []
      this.checked.map(item => {
        arr.push(item.name)
      })
      this.showStr = arr.join('-')
    }
  },
  created () {
    this.showStr = this.default
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
.area-popup-style {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: rem(800);
}
.area-module-popup-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  height: rem(84);
  // border-bottom: 1px solid $color-border;
  .left-style, .right-style {
    width: rem(80);
    text-align: center;
    font-size: rem(28);
    color: $color-primary;
  }
  .title-style {
    flex: 1;
    text-align: center;
    font-size: rem(28);
    color: $color-word;
  }
}
.area-checked-tabs {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
  height: rem(96);
  line-height: rem(96);
  padding: rem(0) rem(28);
  box-sizing: border-box;
  border-bottom: 1px solid $color-border;
  font-size: rem(28);
  color: $color-word;
  .area-checked-item {
    height: rem(96);
    margin-right: rem(30);
  }
  .area-checked-active {
    position: relative;
    height: rem(96);
    color: $color-primary;
    border-bottom: $color-primary;
  }
  .area-checked-active:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    border-bottom: 1px solid $color-primary;
  }
}
.area-check-list {
  flex: 1;
  padding: rem(10) rem(28);
  box-sizing: border-box;
  overflow-y: scroll;
  .area-check-list-item {
    position: relative;
    width: 100%;
    line-height: rem(76);
    font-size: rem(28);
    color: $color-word;
    text-align: left;
  }
  .area-check-list-item:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    border-bottom: 1px solid $color-border;
  }
}
</style>
