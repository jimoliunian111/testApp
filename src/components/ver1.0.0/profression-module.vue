<template>
  <div class="profression-module">
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">{{title}}</div>
      <div class="product-info-form-item-content" v-if="type === 'detail'">
        <div class="form-item-content" @click="showPopup">{{profressionStr || '请选择'}}</div>
      </div>
    </div>


    <van-popup v-model="show" class="profression-popup-style" position="right">
      <div class="profression-module-box">
        <div class="profression-module-header">
          <div class="header-option">
            <span class="icon iconfont" v-if="totalList.length > 1" @click="backStep">&#xe618;</span>
          </div>
          <div class="header-title">{{title}}</div>
          <div class="header-close" @click="closePopup">
            <span class="icon iconfont">&#xe617;</span>
          </div>
        </div>
        <div class="search-only-box">
          <div class="search-enter-style">
            <span class="icon iconfont">&#xe61f;</span>
            <span>请输入关键字</span>
          </div>
        </div>
        <div class="checked-show-box">
          <p>已选择：</p>
          <p>{{tempStr}}</p>
        </div>
        <div class="profression-list-style" v-if="totalList.length > 0">
          <div class="list-item-style" v-for="(item, idx) in totalList[count - 1]" :key="idx" @click="getData(item)">
            <p>{{item.name}}</p>
            <p><span class="icon iconfont">&#xe60f;</span></p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 根据type来判定用于哪个页面，仅支持detail or insure两个页面
// 本组件应该支持查看与导出数据，传的参为islook，默认为false即组件默认为导出数据，导出的数据为所选的职业数组（按照leavel）和拼接的职业字符串与传进来的keyStr
// 根据外部传的职业级数count来判定要多少级的数据（默认为3级）
// 根据传入的api方法参数：apiFunc来判定调用哪个接口
// 根据参数defaultName设置默认字符串
// 点击请选择的时候才会请求

//---组件流程
// 1、只在顺时针流程请求接口，逆向操作不请求接口， 读取本地缓存进行渲染，减轻服务器压力，加快页面渲染。以大数组totalList来leavel级的数组
// 2、请求回来的数组根据等级push进totalList，因无法检测数组更新， 故采用vue.set方式更新数组
// 3、按返回按钮时候
import { Popup, Picker } from 'vant'
import *as Api from '@/api/profression.js'
export default {
  name: 'template-name',
  props: {
    title: {
      type: String
    },
    isLook: {
      type: Boolean,
      default: true,
    },
    id: {
      type: Number,
      default: 149
    },
    keyStr: { // 原封不动传出去用作外组件的赋值
      type: String
    },
    type: { // 本组件用于哪个页面，detail or insure ，默认为detail
      type: String, // detail or insure
      default: 'detail'
    },
    leavel: {
      type: Number,
      default: 3
    },
    apiFunc: { // 要请求的方法，即对应'@/api/profression.js'导出的方法
      type: String,
      default: 'appProfression'
    },
    defaultName: {
      type: String,
      default: '大老板-二老板-小老板',
    }
  },
  data () {
    return {
      show: false,
      profressionStr: '', // 正式显示的职业字符串
      tempStr: '', // popup内拼接显示的职业字符串
      checked: [], // 已经选中的职业数组
      count: 0, // 当count为3的时候停止发请求， 即最多请求3次，totalList里最多有三个数组
      totalList: [] // 总的，装三个级别的职业数组
    }
  },
  components: {
    [Popup.name]: Popup
  },
  methods: {
    showPopup () {
      this.show = true
      this.init()
      this.count = 0
      this.getData()
    },
    closePopup () {
      this.show = false
    },
    backStep () {
      if (this.count === 1) return
      this.count -= 1
    },
    getData (item) {
      let params = {
        product_id: this.id
      }
      if (item) { // 点击选择的时候
        params.parent_id = item.id
      }
      let that = this
      Api[this.apiFunc](params).then(res => {
        console.log('职业请求成功', res)
        // if (res.data.length > 0) {
          that.$set(that.totalList, that.count, res.data)
          that.count = that.count + 1
          if (item) {
            that.$set(that.checked, that.count - 2, item)
            that.setProfressionStr(that.checked)
            if ((that.count - 1 === that.leavel) && that.isLook) { // 看当前选项是第几级，并判断当前组件是读取还是导出，islook
              // 仅查看
              return
            }
            if ((that.count - 1 === that.leavel) && !that.isLook) { // 看当前选项是第几级，并判断当前组件是读取还是导出，islook
              // 关闭popup并导出数据
              that.$emit('getData', that.checked, that.profressionStr, that.keyStr)
              that.closePopup()
            }
          }
        // }
      }).catch(res => {
        console.log('职业请求失败', res)
      })
    },
    setProfressionStr (arr) {
      if (arr.length === 0) return
      let newArr = []
      arr.map(item => {
        newArr.push(item.name)
      })
      this.tempStr = newArr.join('-') // 每次点击职业时候调用拼接
      if (this.count - 1 === this.leavel) { // 当点击的等级等于组件外传进来的leavel相等时，才将临时tempstr赋值给profressionStr，避免选择一半不选后数据异常
        this.profressionStr = this.tempStr
      }
    },
    init () {
      this.profressionStr = this.defaultName
      this.tempStr = this.defaultName
    }
  },
  created () {
    this.init()
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
.profression-module {
  width: 100%;
}
.profression-popup-style {
  width: 70%;
  height: 100%;
}
.profression-module-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
.profression-module-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
  height: rem(86);
  border-bottom: 1px solid $color-border;
  .header-option {
    width: rem(66);
    height: 100%;
    line-height: rem(86);
    span {
      color: $color-sub;
    }
  }
  .header-close {
    width: rem(66);
    height: 100%;
    line-height: rem(86);
    span {
      color: $color-sub;
    }
  }
  .header-title {
    flex: 1;
    font-size: rem(32);
    color: $color-word;
  }
}
.search-only-box {
  width: 100%;
  // height: rem(82);
  padding: rem(18) rem(12);
  box-sizing: border-box;
  // border-bottom: 1px solid $color-border;
  background: $color-background;
  .search-enter-style {
    width: 100%;
    height: rem(62);
    padding: rem(0) rem(12);
    box-sizing: border-box;
    text-align: left;
    line-height: rem(62);
    color: $color-sub;
    font-size: rem(26);
    background: $color-page-background;
    .iconfont {
      margin-right: rem(10);
      font-size: rem(24);
    }
  }
}
.checked-show-box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: rem(60);
  padding: rem(22) rem(12);
  box-sizing: border-box;
  line-height: 1.4;
  font-size: rem(28);
  text-align: left;
  background: $color-page-background;
  p:first-of-type {
    width: rem(120);
    color: $color-sub;
  }
  p:last-of-type {
    flex: 1;
    text-align: left;
    color: $color-word;
  }
}
.profression-list-style {
  flex: 1;
  overflow-y: scroll;
  .list-item-style {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 100%;
    padding: rem(20  ) rem(5);
    box-sizing: border-box;;
    border-top: 1px solid $color-border;
    color: $color-word;
    font-size: rem(32);
    p:first-of-type {
      flex: 1;
      padding: rem(0) rem(10);
      box-sizing: border-box;
      text-align: left;
    }
    p:last-of-type {
      width: rem(40);
      .iconfont {
        font-size: rem(24);
        color: $color-sub;
      }
    }
  }
}
</style>
