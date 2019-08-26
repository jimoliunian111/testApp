<template>
  <div class="insure-page" v-if="isInit && insureData">
    <div class="insure-module-style">
      <div class="insure-product-title">{{insureData.product && insureData.product.name}}</div>
    </div>

    <div class="insure-module-style">
      <div class="little-module-title">
        <div class="left-style">
          <span class="icon iconfont">&#xe604;</span>
          <span class="plan-style">保障计划</span>
        </div>
        <div class="right-style"></div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">保障期限</div>
        <div class="right-style" v-if="insureData.insure_plan.guarantee_period">
          {{insureData.insure_plan.guarantee_period.items.find(item => +item.value === +insureData.insure_plan.guarantee_period.default).label}}
        </div>
      </div>
      <!-- <div class="insure-item-style">
        <div class="left-style">保障额度</div>
        <div class="right-style" v-if="insureData.insure_plan.guarantee_quota">
          {{insureData.insure_plan.guarantee_quota.items.find(item => +item.value === +insureData.insure_plan.guarantee_quota.default).label}}
        </div>
      </div> -->
      <div class="insure-item-style">
        <div class="left-style">缴费期限</div>
        <div class="right-style" v-if="insureData.insure_plan.payment_period">
          {{insureData.insure_plan.payment_period.items.find(item => +item.value === +insureData.insure_plan.payment_period.default.value).label}}
        </div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">起保日期</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
    </div>

    <div class="insure-module-style">
      <div class="little-module-title">
        <div class="left-style">
          <span class="icon iconfont">&#xe600;</span>
          <span class="plan-style">投保人信息</span>
        </div>
        <div class="right-style"></div>
      </div>
      
      <insure-input-module title="投保人姓名" :value="insureData.applicant.name.default" warn="请输入用户名" :error="true" keyStr="applicant_name"></insure-input-module>

      <insure-check-module 
      title="证件类型" 
      :list="insureData.applicant.certificate.type.items" 
      keyStr="applicant_certificate_type" 
      :active="insureData.applicant.certificate.type.default"></insure-check-module>
      
      <insure-input-module title="证件号码" :value="insureData.applicant.certificate.number.default" warn="请输入证件号码" 
      :error="true" keyStr="applicant_certificate_number"></insure-input-module>

      <insure-datetime-module type="check" 
      title="起效时间" 
      :value="insureData.applicant.certificate.valid_start_at.default"
      keyStr="applicant_valid_start_at"
      :max="insureData.applicant.certificate.type.items.find(item => item.value === insureData.applicant.certificate.type.default).valid_start_at.max"
      :min="insureData.applicant.certificate.type.items.find(item => item.value === insureData.applicant.certificate.type.default).valid_start_at.min"></insure-datetime-module>
      
      <insure-check-module
      title="失效时期" 
      :list="insureData.applicant.certificate.type.items.find(item => item.value === insureData.applicant.certificate.type.default).is_long_term" 
      keyStr="applicant_certificate_type" 
      :active="insureData.applicant.certificate.is_long_term.default"></insure-check-module>
      
      <insure-datetime-module type="check" 
      title="失效时间" 
      :value="insureData.applicant.certificate.valid_end_at.default"
      keyStr="applicant_valid_end_at"
      :max="insureData.applicant.certificate.type.items.find(item => item.value === insureData.applicant.certificate.type.default).valid_end_at.max"
      :min="insureData.applicant.certificate.type.items.find(item => item.value === insureData.applicant.certificate.type.default).valid_end_at.min"></insure-datetime-module>
      
      <insure-datetime-module 
      title="出生日期" 
      :value="insureData.applicant.birthday.default"
      keyStr="applicant_birthday"
      :max="insureData.applicant.birthday.max"
      :min="insureData.applicant.birthday.min"></insure-datetime-module>

      <insure-check-module 
      title="性别" 
      :list="insureData.applicant.gender.items" 
      keyStr="applicant_certificate_type" 
      :active="insureData.applicant.gender.default"></insure-check-module>

      <insure-input-module title="手机号码" :value="insureData.applicant.mobile.default" warn="请输入手机号码" :error="true" keyStr="applicant_mobile"></insure-input-module>

      <insure-city-module title="所在地区" :name="applicantCityName"></insure-city-module>
      
      <insure-input-module title="详细地址" :value="insureData.applicant.personal_address.detail.default" warn="请输入详细地址" :error="true" keyStr="applicant_address"></insure-input-module>
      
      <insure-input-module title="通讯邮编" :value="insureData.applicant.personal_address.zip_code.default" warn="请输入通讯邮编" :error="true" keyStr="applicant_zip_code"></insure-input-module>
      
      <insure-input-module title="电子邮箱" :value="insureData.applicant.email.default" warn="请输入电子邮箱" :error="true" keyStr="applicant_email"></insure-input-module>
      
      <profression-module title="职业" keyStr="applicant_profression" type="insure" :defaultName="insureData.applicant.profession.default.name"></profression-module>
    </div>

    <div class="insure-module-style">
      <div class="little-module-title">
        <div class="left-style">
          <span class="icon iconfont">&#xe603;</span>
          <span class="plan-style">被保人信息</span>
        </div>
        <div class="right-style"></div>
      </div>
      
      <insure-select-module title="为谁投保" :list="insureData.insured.relation.items" :active="insureData.insured.relation.default" keyStr="insured_relation"></insure-select-module>
 
      <insure-input-module title="被投保人姓名" :value="insureData.insured.name.default" warn="请输入被投保人姓名" :error="true" keyStr="insured_name"></insure-input-module>

      <insure-check-module 
      title="证件类型" 
      :list="insureData.insured.certificate.type.items" 
      keyStr="insured_certificate_type" 
      :active="insureData.insured.certificate.type.default"></insure-check-module>
      
      <insure-input-module title="证件号码" :value="insureData.insured.certificate.number.default" warn="请输入证件号码" 
      :error="true" keyStr="insured_certificate_number"></insure-input-module>

      <insure-datetime-module type="check" 
      title="起效时间" 
      :value="insureData.insured.certificate.valid_start_at.default"
      keyStr="insured_valid_start_at"
      :max="insureData.insured.certificate.type.items.find(item => item.value === insureData.insured.certificate.type.default).valid_start_at.max"
      :min="insureData.insured.certificate.type.items.find(item => item.value === insureData.insured.certificate.type.default).valid_start_at.min"></insure-datetime-module>
      
      <insure-check-module
      title="失效时期" 
      :list="insureData.insured.certificate.type.items.find(item => item.value === insureData.insured.certificate.type.default).is_long_term" 
      keyStr="insured_certificate_type" 
      :active="insureData.insured.certificate.is_long_term.default"></insure-check-module>
      
      <insure-datetime-module type="check" 
      title="失效时间" 
      :value="insureData.insured.certificate.valid_end_at.default"
      keyStr="applicant_valid_end_at"
      :max="insureData.insured.certificate.type.items.find(item => item.value === insureData.insured.certificate.type.default).valid_end_at.max"
      :min="insureData.insured.certificate.type.items.find(item => item.value === insureData.insured.certificate.type.default).valid_end_at.min"></insure-datetime-module>
      
      <insure-datetime-module 
      title="出生日期" 
      :value="insureData.insured.birthday.default"
      keyStr="insured_birthday"
      :max="insureData.insured.birthday.max"
      :min="insureData.insured.birthday.min"></insure-datetime-module>

      <insure-check-module 
      title="性别" 
      :list="insureData.insured.gender.items" 
      keyStr="insured_certificate_type" 
      :active="insureData.insured.gender.default"></insure-check-module>

      <insure-input-module title="手机号码" :value="insureData.insured.mobile.default" warn="请输入手机号码" :error="true" keyStr="insured_mobile"></insure-input-module>

      <insure-city-module title="所在地区" :name="insuredCityName"></insure-city-module>
      
      <insure-input-module title="详细地址" :value="insureData.insured.personal_address.detail.default" warn="请输入详细地址" :error="true" keyStr="insured_address"></insure-input-module>
      
      <insure-check-module 
      title="有无社保" 
      :list="insureData.insured.social_security.items" 
      keyStr="insured_social_security" 
      :active="insureData.insured.social_security.default"></insure-check-module>

      <insure-input-module title="身高" :value="insureData.insured.height.default" warn="请输入身高" :error="true" keyStr="insured_height"></insure-input-module>
      
      <insure-input-module title="体重" :value="insureData.insured.weight.default" warn="请输入体重" :error="true" keyStr="insured_weight"></insure-input-module>

      <insure-input-module title="年收入" :value="insureData.insured.annual_income.default" warn="请输入年收入" :error="true" keyStr="insured_annual_income"></insure-input-module>

      <profression-module title="职业" keyStr="insured_profression" type="insure" :defaultName="insureData.insured.profession.default.name"></profression-module>
    </div>


    <div class="insure-module-style">
      <div class="little-module-title">
        <div class="left-style">
          <span class="icon iconfont">&#xe603;</span>
          <span class="plan-style">受益人信息</span>
        </div>
        <div class="right-style"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field } from 'vant'
import insureInputModule from '@/components/ver1.0.0/insure-input-module.vue'
import insureCheckModule from '@/components/ver1.0.0/insure-check-module.vue'
import insureDatetimeModule from '@/components/ver1.0.0/insure-datetime-module.vue'
import insureCityModule from '@/components/ver1.0.0/insure-city-module.vue'
import profressionModule from '@/components/ver1.0.0/profression-module.vue'
import insureSelectModule from '@/components/ver1.0.0/insure-select-module.vue'
import { getAttributes } from '@/api/index.js'
export default {
  name: 'insure-page',
  data () {
    return {
      insureData: {},
      viewData: {},
      isInit: false
    }
  },
  components: {
    [Field.name]: Field,
    insureInputModule,
    insureCheckModule,
    insureDatetimeModule,
    insureCityModule,
    profressionModule,
    insureSelectModule
  },
  methods: {
    getData () {
      this.insureData = require('../datas/insureModel.json')
      this.viewData = this.insureData
      this.isInit = true
      return // 测试数据
      let data = this.$store.getters.getdetailConf
      if (!data) return
      let params = {
        product_id: data.product_id || 149,
        insured: {
          birthday: data.insured_birthday,
          gender: data.insured_gender,
          profession: data.insured_profession_code,
          profession_id: data.insured_profession_id,
          profession_name: data.insured_profession_name,
          social_security: data.social_security,
          personal_address: {
            area: '25679' || data.insured_personal_address_area,
            city: '25678' || data.insured_personal_address_city,
            province: '25677' || data.insured_personal_address_province
          }
        },
        insure_plan: {
          guarantee_period: data.guarantee_period,
          guarantee_quota: data.guarantee_quota,
          payment_period_unit: data.payment_period_unit,
          payment_period_value: data.payment_period_value
        }
      }
      getAttributes(params).then(res => {
        console.log('投保页初始化成功', res)
        this.insureData = res.data
        this.viewData = this.insureData
        this.isInit = true
      }).catch(res => {
        console.log('投保页初始化失败', res)
      })
    },
    certificateCheck (item) {
      this.insureData.applicant.certificate.type.default = item.value
    }
  },
  computed: {
    applicantCityName () {
      let arr = []
      arr[0] = this.insureData.applicant.personal_address.province.default.name
      arr[1] = this.insureData.applicant.personal_address.city.default.name
      arr[2] = this.insureData.applicant.personal_address.area.default.name
      if (arr[0] !== '') {
        return arr.join('-')
      } else {
        return ''
      }
    },
    insuredCityName () {
      let arr = []
      arr[0] = this.insureData.insured.personal_address.province.default.name
      arr[1] = this.insureData.insured.personal_address.city.default.name
      arr[2] = this.insureData.insured.personal_address.area.default.name
      return arr.join('-')
    }
  },
  created () {
    if (window.sessionStorage.getItem('setdetailConf')) {
      this.$store.dispatch('setdetailConf', JSON.parse(window.sessionStorage.getItem('setdetailConf')))
      this.getData()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.insure-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-page-background;
}
.insure-module-style {
  width: rem(730);
  margin: rem(20) auto 0 auto;
  padding: rem(30) rem(28) rem(10) rem(28);
  box-sizing: border-box;
  border-radius: rem(30);
  background: $color-background;
}
.insure-product-title {
  width: 100%;
  margin-bottom: rem(20);
  text-align: left;
  font-size: rem(38);
  font-weight: bold;
  color: $color-word;
}
.little-module-title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  margin: rem(14) 0 rem(34) 0;
  .left-style {
    .icon {
      margin-right: rem(15);
      font-size: rem(32);
      color: $color-sub;
    }
    .plan-style {
      font-size: rem(32);
      color: $color-sub;
    }
  }
  .right-style {

  }
}
// .insure-item-style {
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: space-between;
//   align-content: center;
//   align-items: center;
//   width: 100%;
//   padding: rem(28) rem(0);
//   box-sizing: border-box;
//   border-top: 1px solid $color-border;
//   text-align: left;
//   font-size: rem(30);
//   .left-style {
//     width: rem(200);
//   }
//   .right-style {
//     flex: 1;
//     .van-cell {
//       padding: 0;
//       line-height: 0;
//     }
//     .insure-checked-box {
//       display: flex;
//       flex-flow: row nowrap;
//       justify-content: flex-start;
//       align-content: center;
//       align-items: center;
//       width: 100%;
//       .insure-check-item {
//         height: rem(54);
//         padding: rem(0) rem(8);
//         box-sizing: border-box;
//         line-height: rem(48);
//         color: $color-word;
//         font-size: rem(28);
//         border: 1px solid $color-border;
//         border-radius: rem(10);
//       }
//     }
//   }
//   .insure-active-style {
//     border: 1px solid $color-primary !important;
//     color: $color-primary !important;
//   }
// }

</style>

// .error input::-webkit-input-placeholder {    
//   color: red !important;
// }
// .error input {
//   color: red !important;
// }
// .error span {
//   color: red !important;
// }
// .error >>> .vux-cell-value {
//   color: red !important;
// }
// .error::before {
//   position: absolute;
//   left: -.4rem;
//   content: "";
//   width: .373333rem;
//   height: .373333rem;
//   background: url(../../../../assets/image/sinosig/wddg/error-icon.png) no-repeat;
//   background-size: contain;
//   margin-right: .12rem;
// }
// .error .placeholder {
//   color: red !important;
// }
// .error select {
//   color: red !important;
// }
