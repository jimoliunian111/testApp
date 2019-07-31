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
    <template v-if="initData.insured_birthday">
      <datetime-module title="被保人出生日期" :dateData="initData.insured_birthday"
      @getData="getDateTime" keyStr="insured_birthday"></datetime-module>
    </template>
    <template v-if="initData.insured_gender">
      <select-module title="被保人性别" :list="initData.insured_gender.items" :active="initData.insured_gender.default"
      keyStr="insured_gender" @getData="getSelectData" type="check"></select-module>
    </template>
    <template v-if="initData.guarantee_period">
      <select-module title="职业类型" :list="initData.guarantee_period.items" :active="initData.guarantee_period.default"></select-module>
    </template>
    <template v-if="initData.guarantee_period">
      <city-module title="投保区域" @getData="getCityData"></city-module>
    </template>
    <template v-if="initData.social_security">
      <select-module title="有无社保" :list="initData.social_security.items" :active="initData.social_security.default"
      keyStr="social_security" @getData="getSelectData" type="check"></select-module>
    </template>
    <template v-if="initData.guarantee_period">
      <select-module title="保障期限" :list="initData.guarantee_period.items" :active="initData.guarantee_period.default"
      keyStr="guarantee_period" @getData="getSelectData"></select-module>
    </template>
    <template v-if="initData.guarantee_quota">
      <select-module title="保障额度" :list="initData.guarantee_quota.items" :active="initData.guarantee_quota.default"
      keyStr="guarantee_quota" @getData="getSelectData"></select-module>
    </template>
    <template v-if="initData.payment_period">
      <select-module title="缴费期限" :list="initData.payment_period.items" :active="initData.payment_period.default.value"
      keyStr="payment_period" @getData="getSelectData"></select-module>
    </template>

    <div class="product-info-form-item">
      <div class="product-info-form-item-title">年收入</div>
      <div class="product-info-form-item-content"><div>10万</div></div>
    </div>

    <div class="module-margin-top">
      <div class="common-title">
        <i class="icon iconfont">&#xe610;</i> 理赔服务
      </div>
    </div>

    <product-introduction :confs="tabsList" :detail="detailData"></product-introduction>

    <footer-tool-module :money="money" @share="shareFunc"></footer-tool-module>

    <share></share>
  </div>
</template>

<script>
import { getDetail, getCalculate, getAttr, fetchAgent } from '@/api'
import { Popup, Picker } from 'vant';
import productIntroduction from '@/components/ver1.0.0/product-introduction.vue'
import selectModule from '@/components/ver1.0.0/select-module.vue'
import cityModule from '@/components/ver1.0.0/city-module.vue'
import datetimeModule from '@/components/ver1.0.0/datetime-module.vue'
import footerToolModule from '@/components/ver1.0.0/footer-tool-module.vue'

export default {
  name: 'huagui_damai',
  data () {
    return {
      detailData: {},
      product_id: '',
      channel_product_id: '',
      money: '',
      tabsList: [
        {title: '产品特色', name: 'features'},
        {title: '投保须知', name: 'attentions'},
        {title: '产品条款', name: 'clause'},
        {title: '理赔服务', name: 'claims'}
        // {title: '投保案例', name: 'example'},
        // {title: '用户评论', name: 'comment'},
      ],
      tabActive: 'features',
      formValue: {},
      initData: {}
    }
  },
  provide () {
    return {
      sourceData: this.getDetailData
    }
  },
  components: {
    productIntroduction,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    selectModule,
    cityModule,
    datetimeModule,
    footerToolModule
  },
  created () {
    localStorage.setItem('userToken', 'b22a2adf48587076e96941a4ecfde64f')
    this.getData()
  },
  mounted() {
  },
  methods: {
    getDetailData () {
      return this.detailData
    },
    getData () {
      let params = {
        id: 20
      }
      getDetail(params).then(res => {
        this.datttt = '2'
        console.log('详情数据请求成功', res)
        this.detailData = res.data
        this.product_id = res.data.id
        this.channel_product_id = res.data.channel_product_id
        this.initData = this.detailData.attributes
        this.setFormValue(this.initData)
      })
    },
    setFormValue (data) { // 设置formvalue， 产品参数，保费计算，属性监听都是
      this.formValue = {
        annual_income: data.annual_income.default,
        applicant_birthday: data.applicant_birthday.default,
        applicant_gender: data.applicant_gender.default,
        insured_personal_address_area: '',
        insured_personal_address_city: '',
        insured_personal_address_province: '',
        insured_birthday: data.insured_birthday.default,
        insured_gender: data.insured_gender.default,
        guarantee_quota: data.guarantee_quota.default,
        guarantee_period: data.guarantee_period.default,
        payment_period_unit: data.payment_period.default.unit,
        payment_period_value: data.payment_period.default.value,
        payment_period: data.payment_period.default.value,
        product_id: this.product_id,
        social_security: data.social_security.default
      }
      this.calculate()
    },
    calculate () { // 算保费
      let params = this.formValue
      getCalculate(params).then(res => {
        console.log('计算保费成功', res)
        this.money = res.data.amount
      }).catch(res => {
        console.log('计算保费失败', res)
      })
    },
    changeAttr () { // 监听属性
      let params = this.formValue
      getAttr(params).then(res => {
        this.initData = res.data
        this.setFormValue(this.initData)
      }).catch(res => {
        console.log('属性监听失败', res)
      })
    },
    getSelectData (data, key) { // 获取组件数据， 根据返回的key赋值相应的参数并更新保费
      console.log('sssss', data, key)
      this.formValue[key] = data.value
      this.changeAttr()
    },
    getDateTime (data, key) {
      this.formValue[key] = data
      this.changeAttr()
    },
    getCityData (data, str) {
      console.log('777777777', data, str)
    },
    shareFunc () {
      let params = {
        channel_product_id: this.channel_product_id,
        product_id: this.product_id,
        target: 1,
        data: JSON.stringify(this.formValue)
      }
      this.$root.$emit('share', params)
      // fetchAgent(params).then(res => {
      //   console.log('分享成功', res)
      // }).catch(res => {
      //   console.log('分享失败', res)
      // })
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


</style>
