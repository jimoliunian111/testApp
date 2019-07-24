<template>
  <div class="profession-module" v-if="show">
    <van-popup v-model="show" position="right" @click-overlay="closeFunc" :close-on-click-overlay="false">
      <div class="profession-module-content">
        333333
      </div>
    </van-popup>
  </div>
  
</template>

<script>
import { Popup } from 'vant'
export default {
  name: 'profession-module',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  components: {
    [Popup.name]: Popup
  },
  methods: {
    closeFunc () {
      this.$emit('update:show', false)
    }
  },
  created () {
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
.profession-module {
  width: 100%;
  height: 100%;
}
.profession-module-content {
  width: rem(300);
  height: 100vh;
  background: #fff;
}
</style>
