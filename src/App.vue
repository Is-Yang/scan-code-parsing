<template>
  <div id="app">
    <router-view></router-view>

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

body {
  background-color: #fbf9fe;
}
</style>
