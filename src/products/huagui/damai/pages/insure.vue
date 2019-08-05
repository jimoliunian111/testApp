<template>
  <div class="insure-page" v-if="isInit">
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
        <div class="right-style">
          {{insureData.insure_plan.guarantee_period.items.find(item => item.value === insureData.insure_plan.guarantee_period.default).label}}
        </div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">保障额度</div>
        <div class="right-style">
          {{insureData.insure_plan.guarantee_quota.items.find(item => item.value === insureData.insure_plan.guarantee_quota.default).label}}
        </div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">缴费期限</div>
        <div class="right-style">
          {{insureData.insure_plan.payment_period.items.find(item => item.value === insureData.insure_plan.payment_period.default.value).label}}
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
      <div class="insure-item-style">
        <div class="left-style">投保人姓名</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">证件类型</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">证件号码</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">起效时间</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">失效时期</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">失效时间</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">出生日期</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">性别</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">手机号码</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">所在地区</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">详细地址</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">通讯邮编</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">电子邮箱</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
      <div class="insure-item-style">
        <div class="left-style">职业</div>
        <div class="right-style">{{insureData.insure_plan.insure_start_at.default}}</div>
      </div>
    </div>

    <div class="insure-module-style">
      <div class="little-module-title">
        <div class="left-style">
          <span class="icon iconfont">&#xe603;</span>
          <span class="plan-style">被保人信息</span>
        </div>
        <div class="right-style"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAttributes } from '@/api/index.js'
export default {
  name: 'insure-page',
  data () {
    return {
      insureData: {},
      isInit: false
    }
  },
  components: {

  },
  methods: {
    getData () {
      let data = this.$store.getters.getdetailConf
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
        this.isInit = true
      }).catch(res => {
        console.log('投保页初始化失败', res)
      })
    }
  },
  computed: {

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.sessionStorage.getItem('setdetailConf')) {
        vm.$store.dispatch('setdetailConf', JSON.parse(window.sessionStorage.getItem('setdetailConf')))
        vm.getData()
      }
    })
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
.insure-item-style {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: flex-start;
  width: 100%;
  padding: rem(28) rem(0);
  box-sizing: border-box;
  border-top: 1px solid $color-border;
  text-align: left;
  font-size: rem(30);
  .left-style {
    width: rem(200);
  }
  .right-style {
    flex: 1;
  }
}
</style>
