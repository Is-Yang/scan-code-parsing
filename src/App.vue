<template>
  <div id="app">
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
</template>

<script>
import { XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    XHeader,
    Tabbar,
    TabbarItem
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body, html {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
body {
  background-color: #fbf9fe;
}
#app {
  height: 100%;

  .view-container {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding-bottom: 55px;
  }
}
</style>
