<template>
  <div class="damai-page">
    <div class="banner-style">
      <img :src="detailData.banner" />
    </div>
    <div class="product-info">
      <p class="main-title">{{detailData.name}}</p>
      <p class="sub-title">该产品由 {{detailData.company_name}} 承保并负责理赔</p>
    </div>

    <div class="product-info-form-item">
      <div class="product-info-form-item-title">承包年龄</div>
      <div class="product-info-form-item-content">18-60周岁</div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">被保人出生日期</div>
      <div class="product-info-form-item-content">
        <div>2019-01-01</div>
        <div>图标</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">被保人性别</div>
      <div class="product-info-form-item-content">
        <div>男</div>
        <div>女</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">职业类型</div>
      <div class="product-info-form-item-content">
        <div>帅气少年</div>
        <div>请选择</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">投保区域</div>
      <div class="product-info-form-item-content">
        <div>广东省-广州市-海珠区</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">有无社保</div>
      <div class="product-info-form-item-content">
        <div>有</div>
        <div>无</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">保障期限</div>
      <div class="product-info-form-item-content">
        <div>请选择</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">保障额度</div>
      <div class="product-info-form-item-content">
        <div>请选择</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">缴费期限</div>
      <div class="product-info-form-item-content">
        <div>请选择</div>
      </div>
    </div>
    <div class="product-info-form-item">
      <div class="product-info-form-item-title">年收入</div>
      <div class="product-info-form-item-content">
        <div>10万</div>
      </div>
    </div>

    <div class="product-detail">
      <div class="main-tabs" ref="mainTabs" id="mainTabs">
        <div class="tab-item" :class="{'tab-active': tabActive === item.name}" @click="tabClick(item.name)" v-for="(item, idx) in tabsList" :key="idx">
          <span>{{item.title}}</span>
        </div>
      </div>

      <div class="tab-content-style" id="features" ref="features">产品特色</div>
      <div class="tab-content-style" id="attentions" ref="attentions">投保须知</div>
      <div class="tab-content-style" id="clause" ref="clause">产品条款</div>
      <div class="tab-content-style" id="claims" ref="claims">理赔服务</div>
    </div>
  </div>
</template>

<script>
import { getAppDetail } from '@/api'
export default {
  name: 'huagui_damai',
  data () {
    return {
      detailData: {},
      tabsList: [
        {title: '产品特色', name: 'features'},
        {title: '投保须知', name: 'attentions'},
        {title: '产品条款', name: 'clause'},
        {title: '理赔服务', name: 'claims'}
        // {title: '投保案例', name: 'example'},
        // {title: '用户评论', name: 'comment'},
      ],
      tabActive: 'features'
    }
  },
  created () {
    this.getData()
  },
  mounted() {
    this.bindScrollEvent()
  },
  methods: {
    getData () {
      let params = {
        id: 20
      }
      getAppDetail(params).then(res => {
        console.log('详情数据请求成功', res)
        this.detailData = res.data
      })
    },
    bindScrollEvent() {
      window.addEventListener('scroll', this.scrollHandler);
    },
    unBindScrollEvent() {
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
      });
    },
    tabClick (type) {
      console.log('aaaaa', this.$refs[type].offsetTop, )
      let tabHeight = this.$refs.mainTabs.getBoundingClientRect().height
      let blockTop = this.$refs[type].offsetTop
      let disparity = 0
      this.$nextTick(function () {
        document.documentElement.scrollTop = blockTop - tabHeight
      })
      this.tabActive = type
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/styles/main.scss';
.damai-page {
  width: 100%;
  background: #f5f5f5;
}
.banner-style {
  width: 100%;
}
.banner-style img {
  width: 100%;
}
.product-info {
  width: 100%;
  padding: rem(20) rem(28);
  box-sizing: border-box;
  background: #fff;
  .main-title {
    text-align: left;
    font-size: rem(44);
    color: $color-word;
  }
  .sub-title {
    width: 100%;
    margin-top: rem(15);
    text-align: left;
    font-size: rem(28);
    color: $color-sub;
  }
}
.product-info-form-item {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  padding: rem(26) rem(28);
  box-sizing: border-box;
  font-size: rem(28);
  background: #fff;
}
.product-info-form-item::before {
  content: '';
  position: absolute;
  left: rem(28);
  top: 0;
  width: rem(694);
  height: 0;
  border-top: rem(1) solid $color-border;
}
.product-info-form-item-title {
  max-width: rem(200);
}
.product-info-form-item-content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
}
.product-detail {
  width: 100%;
  margin-top: rem(10);
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
  background: #fff;
}
.tab-item {
  flex: 1;
  line-height: rem(70);
  font-size: rem(24);
}
.tab-active {
  color: $color-primary;
  border-bottom: rem(1) solid $color-primary;
}
.tab-content-style {
  width: 100%;
  height: rem(500);
}
</style>
