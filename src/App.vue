<template>
  <div id="app" v-transfer-dom>
    <div class="drawer-body">
      <div class="view-container">
          <router-view></router-view>
      </div>

      <tabbar>
          <tabbar-item link="http://love.hzyctools.com/#/home">
            <i class="iconfont" slot="icon">&#xe65b;</i>
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item link="http://love.hzyctools.com/#/consultant/online">
            <i class="iconfont" slot="icon">&#xe6b4;</i>
            <span slot="label">在线顾问</span>
          </tabbar-item>
          <tabbar-item link="/" class="active">
            <i class="iconfont" slot="icon">&#xe64e;</i>
            <span slot="label">电子合同</span>
          </tabbar-item>
          <tabbar-item link="http://love.hzyctools.com/#/mine">
            <i class="iconfont" slot="icon">&#xe67b;</i>
            <span slot="label">我的</span>
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
  position: fixed !important;
  z-index: 999;
}
.weui-tabbar .weui-tabbar__icon {
  margin-bottom: 5px;
}
.weui-tabbar .active .weui-tabbar__label,
.weui-tabbar .active .iconfont{
  color: #1989fa;
}
</style>
