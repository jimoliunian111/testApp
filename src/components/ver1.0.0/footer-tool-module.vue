<template>
  <div class="footer-tool-module">
    <div class="footer-tool-value-style">
      <!-- <p class="money-title">保费：</p> -->
      <p class="money-value">{{money ? money + '元' : '--'}}</p>
    </div>
    <div class="write-btn-style" @click="writeFunc">填写客户信息</div>
    <div class="share-btn-style" @click="shareFunc">转发客户</div>
  </div>
</template>

<script>
export default {
  name: 'footer-tool-module',
  props: {
    money: {
      type: [ String, Number ]
    },
    type: {
      type: String,
      default: 'app'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    shareFunc () {
      this.$emit('share')
    },
    writeFunc () {
      this.$emit('write')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
.footer-tool-module {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  left: 0;
  width: rem(750);
  height: rem(110);
  padding: rem(0) rem(28);
  box-sizing: border-box;
  border-top: 1px solid $color-border;
  background: $color-background;
  z-index: 101;
}
.write-btn-style {
  width: rem(240);
  border: 1px solid $color-primary;
  border-radius: rem(50);
  line-height: rem(72);
  font-size: rem(32);
  text-align: center;
  color: $color-primary;
  background: $color-background;
}
.share-btn-style {
  width: rem(180);
  margin-left: rem(10);
  border-radius: rem(50);
  line-height: rem(72);
  font-size: rem(32);
  text-align: center;
  color: $color-white;
  background: $color-primary;
}
.footer-tool-value-style {
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  .money-title {
    font-size: rem(24);
  }
  .money-value {
    font-size: rem(40);
    font-weight: 500;
    color: $color-primary;
  }
}
</style>
