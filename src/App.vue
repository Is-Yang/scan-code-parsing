<template>
  <div id="app" v-transfer-dom>
    <div class="drawer-body">
      <div class="view-container">
          <router-view></router-view>
      </div>

      <tabbar>
          <tabbar-item>
            <i class="iconfont" slot="icon">&#xe602;</i>
            <span slot="label">微信</span>
          </tabbar-item>
          <tabbar-item>
            <i class="iconfont" slot="icon">&#xe65b;</i>
            <span slot="label">首页</span>
          </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    XHeader,
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body, html {
    height: 100%;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow: hidden;
    -webkit-overflow-scrolling: touch
}
body {
  background-color: #fbf9fe;
}
#app {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;

  .drawer-body {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .view-container {
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding-bottom: 54px;
    overflow: auto;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    z-index: inherit;
  }
}

.weui-toast {
  width: 2.6rem !important;
}
.weui-tabbar {
  max-width: 768px;
  position: fixed !important;
  z-index: 999;
}
</style>
