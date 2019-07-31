<template>
  <div class="product-introduction module-margin-top">
    <div class="main-tabs" ref="mainTabs" id="mainTabs">
      <div class="tab-item" :class="{'tab-active': tabActive === item.name}" @click="tabClick(item.name)" v-for="(item, idx) in scrollInfo" :key="idx">
        {{item.title}}
      </div>
    </div>

    <div class="tab-content-style" id="features" ref="features">
      <img v-for="(item, index) in detail.features" :key="index" :src="item" alt="产品特色">
    </div>
    <div class="tab-content-style" id="attentions" ref="attentions">
      <div class="common-title">
        <i class="icon iconfont">&#xe610;</i> 投保须知
      </div>
      <div class="common-content padding-style"
            v-if="detail.instruction"
            v-html="PxToRem(detail.instruction)"></div>
    </div>
    <div class="tab-content-style" id="clause" ref="clause">
      <div class="common-title">
        <i class="icon iconfont">&#xe611;</i> 产品条款
      </div>
      <div class="common-content">
        <div class="common-content-item padding-style" v-for="(item, index) in detail.terms" :key="index" @click="produceClauseClick(index)">
          <div class="common-content-item-title">{{ item.name }} </div>
          <div class="common-content-item-icon"><i class="icon iconfont arrow">&#xe616;</i></div>
        </div>
      </div>
    </div>
    <div class="tab-content-style" id="claims" ref="claims">
      <div class="common-title">
        <i class="icon iconfont">&#xe610;</i> 理赔服务
      </div>
      <div class="common-content"
            v-if="detail.claims_service"
            v-html="PxToRem(detail.claims_service)"></div>
    </div>

    <!-- popup -->
    <van-popup v-model="clauseShow"
    position="bottom"
    :lazy-render="true"
    class="clause-popup-style"
    round>
      <div class="popup-header-style">
        <div class="popup-header-style-left"></div>
        <div class="popup-header-style-title">产品条款</div>
        <div class="popup-header-style-right" @click="clauseShow = false">
          <i class="icon iconfont">&#xe614;</i>
        </div>
      </div>
      <div class="popup-content-style">
        <img v-for="(item, index) in popupContentArray.images" :key="index" :src="item.file_url" alt="">
      </div>
    </van-popup>
  </div>
</template>

<script>
import { PxToRem } from '@/utils/common-utils.js';
import { Popup } from 'vant';
export default {
  name: 'product-introduction',
  props: {
    detail: {
      type: Object,
      required: true
    },
    confs: {
      type: Array,
      default: () => {
        return [
          {title: '产品特色', name: 'features'},
          {title: '投保须知', name: 'attentions'},
          {title: '产品条款', name: 'clause'},
          {title: '理赔服务', name: 'claims'}
          // {title: '投保案例', name: 'example'},
          // {title: '用户评论', name: 'comment'},
        ]
      }
    }
  },
  data () {
    return {
      scrollInfo: [],
      tabActive: 'features',
      clauseShow: false,
      popupContentArray: []
    }
  },
  components: {
    [Popup.name]: Popup
  },
  methods: {
    PxToRem,
    bindScrollEvent () {
      window.addEventListener('scroll', this.scrollHandler);
    },
    unBindScrollEvent () {
      window.removeEventListener('scroll', this.scrollHandler);
    },
    scrollHandler () {
      let contents = document.querySelectorAll(".tab-content-style")
      let windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let tabHeight = this.$refs.mainTabs.getBoundingClientRect().height
      contents.forEach(item => {
        if (windowScrollTop + tabHeight > item.offsetTop) {
          this.tabActive = item.id
        }
      })
    },
    tabClick (type) {
      this.unBindScrollEvent();
      this.tabActive = type
      this.$nextTick(() => {
        let tabHeight = this.$refs.mainTabs.getBoundingClientRect().height
        let blockTop = this.$refs[type].offsetTop
        let disparity = blockTop - tabHeight
        document.documentElement.scrollTop = disparity
        document.body.scrollTop = disparity
        // this.bindScrollEvent()
        setTimeout(() => {
          this.bindScrollEvent()
        }, 300)
      })

    },
    setData () {
      this.scrollInfo = []
      this.confs.map((item) => {
        let obj = {
          title: item.title,
          name: item.name,
          content: ''
        }
        this.scrollInfo.push(obj)
      })
    },
    produceClauseClick (type) {
      this.clauseShow = true
      this.popupContentArray = this.detail.terms[type];
    }
  },
  created () {
  },
  mounted () {
    this.setData()
    this.bindScrollEvent()
  },
  beforeDestroy() {
    this.unBindScrollEvent()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
.product-introduction {
  width: 100%;
  background: $color-page-background;
}
.main-tabs {
  position: sticky;
  left: 0;
  top: 0;
  min-width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  border-bottom: 1px solid $color-border;
  background: #fff;
  z-index: 100;
}
.tab-item {
  flex: 1;
  height: rem(80);
  line-height: rem(80);
  font-size: rem(28);
}
.tab-active {
  color: $color-primary;
  border-bottom: rem(4) solid $color-primary;
}
.tab-content-style {
  width: 100%;
  margin-bottom: rem(24);
  img {
    width: 100%;
  }
}
.padding-style {
  padding: rem(0) rem(27);
  box-sizing: border-box;
}
.common-title {
  // height: rem(150);
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
  height: rem(100);
  font-size: rem(32);
  color: $color-sub;
  padding: rem(20) rem(27);
  box-sizing: border-box;
  overflow: hidden;
  font-family: PingFangSC-Regular,sans-serif;
  text-align: left;
  background: $color-background;
  i {
    font-size: rem(32);
  }
}
.common-title::before {
  position: absolute;
  left: rem(28);
  bottom: 0;
  content: '';
  width: rem(694);
  height: 0;
  border-bottom: 1px solid $color-border;
}
.common-content {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  overflow: hidden;
  background: $color-background;
  img {
    width: 100% !important;
  }
}
.common-content-item {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  height: rem(96);
  line-height: rem(96);
}
.common-content-item::before {
  content: '';
  position: absolute;
  left: rem(0);
  bottom: 0;
  width: rem(694);
  height: 0;
  border-bottom: 1px solid $color-border;
}
.common-content-item-title {
  min-width: rem(150);
  font-size: rem(28);
}
.common-content-item-icon {
  width: rem(30);
  i {
    font-size: rem(32);
  }
}

.clause-popup-style {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: rem(700);
  background: $color-background;
}
.popup-header-style {
  display: flex;
  overflow: row nowrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  width: 100%;
  line-height: rem(96);
  border-bottom:1px solid $color-border;
}
.popup-header-style-left, .popup-header-style-right {
  width: rem(70);
  i {
    font-size: rem(34);
  }
}
.popup-header-style-title {
  flex: 1;
  text-align: center;
  font-size: rem(32);
}
.popup-content-style {
  flex: 1;
  overflow-y: scroll;
  width: 100%;
  img {
    width: 100%;
  }
}
img {
  width: 100% !important;
}
</style>
