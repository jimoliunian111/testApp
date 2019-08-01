<template>
  <div class="profression-module">
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">{{title}}</div>
      <div class="product-info-form-item-content" v-if="!type">
        <div class="form-item-content" @click="show = true">{{profressionStr || '请选择'}}</div>
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
          <p>{{profressionStr}}</p>
        </div>
        <div class="profression-list-style" v-if="totalList.length > 0">
          <div class="list-item-style" v-for="(item, idx) in totalList[leval - 1]" :key="idx" @click="getData(item)">
            <p>{{item.name}}</p>
            <p><span class="icon iconfont">&#xe60f;</span></p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker } from 'vant';
import { getProfression } from '@/api/index.js'
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
      show: false,
      columns: [],
      activeObj: {},
      profressionStr: '',
      checked: [], // 已经选中的职业数组
      leval: 0, // 当leval为3的时候停止发请求， 即最多请求3次，totalList里最多有三个数组
      totalList: [] // 总的，装三个级别的职业数组
    }
  },
  components: {
    [Popup.name]: Popup
  },
  methods: {
    closePopup () {
      this.show = false
    },
    backStep () {
      if (this.leval === 1) return
      this.leval -= 1
    },
    getData (item) {
      let params = {
        product_id: 149
      }
      if (item) {
        params.parent_id = item.id
      }
      this.leval += 1
      this.$set(this.totalList, this.leval - 1, []) // 删除对应数据， 避免视图重现上次的数据
      getProfression(params).then(res => {
        console.log('职业请求成功', res)
        // this.totalList[this.leval - 1] = res.data // 此方式添加数据视图不会更新
        this.$set(this.totalList, this.leval - 1, res.data) // 此方式避免了添加数据视图不会更新
        if (item) {
          this.$set(this.checked, this.leval - 2, item)
          this.setProfressionStr()
        }
        if (this.leval === 4) {
          this.closePopup()
          return
        }
      }).catch(res => {
        console.log('职业请求失败', res)
      })
    },
    setProfressionStr () {
      if (this.checked.length === 0) return
      let arr = []
      this.checked.map(item => {
        arr.push(item.name)
      })
      this.profressionStr = arr.join('-')
    }
  },
  created () {
    this.getData()
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
