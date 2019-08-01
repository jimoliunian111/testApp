<template>
  <div class="share-style" v-if="show">
    <van-popup v-model="show" class="share-box-style" position="bottom">
      <div class="share-style">
        <div class="share-way-item" v-for="(item, idx) in shareWays" :key="idx" @click="share(item.target)">
          <div class="icon-style">
            <img :src="item.icon" />
          </div>
          <div class="text-style">{{item.title}}</div>
        </div>
      </div>
      <div class="share-cansel-style" @click="show = false">
        <van-button plain hairline size="large">取消</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { fetchAgent } from '@/api'
import { Popup, Button } from 'vant';
export default {
  name: 'share-style',
  props: {
    type: {
      type: String,
      default: 'app' // app or wap
    },
    way: {

    }
  },
  inject: ['sourceData'],
  data () {
    return {
      shareWays: [
        {icon: require('@/assets/images/share/share-friends-icon.png'), title: '微信', target: 1, way: 'shareWxFriends'},
        {icon: require('@/assets/images/share/share-moment-icon.png'), title: '朋友圈', target: 2, way: 'shareWxMoments'}
      ],
      show: false,
      paramsData: {},
      source: this.sourceData()
    }
  },
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button
  },
  methods: {
    shareFunc (params) {
      fetchAgent(params).then(res => {
        console.log('分享成功', res)
        let shareFuncName = this.shareWays.find(item => item.target === params.target).way
        let jsonData = {
          share_cover: this.source.share_cover,
          share_description: this.source.share_description,
          share_link: res.data.share_link,
          share_title: this.source.title
        }
        try {
          eval('native.' + shareFuncName + '(JSON.stringify(jsonData))')
        } catch(err) {
          try {
              eval('window.webkit.messageHandlers.' + shareFuncName + '.postMessage(JSON.stringify(jsonData))')
            } catch(err) {}
        }
        this.show = false
      }).catch(res => {
        console.log('分享失败', res)
      })
    },
    showShare (params) {
      this.paramsData = params
      this.show = true
    },
    share (target) {
      this.paramsData.target = target
      this.shareFunc(this.paramsData)
    }
  },
  created () {
    this.$root.$off('share')
    this.$root.$on('share', this.showShare)
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
.share-box-style {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.share-style {
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  width: 100%;
  height: rem(400);
  padding: rem(30) rem(28);
  box-sizing: border-box;
  background: $color-background;
}
.share-way-item {
  width: rem(120);
  // height: rem(120);
  .icon-style {
    width: rem(120);
    height: rem(120);
  }
  .text-style {
    width: rem(120);
    height: rem(60);
    line-height: rem(60);
    text-align: center;
  }
}
</style>
