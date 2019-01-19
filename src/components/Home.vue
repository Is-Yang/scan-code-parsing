<template>
  <div>
    <x-header :title="title" style="background-color:#353535;"></x-header>

    <scan-code></scan-code>
    
    <tabbar>
        <tabbar-item>
          <span slot="label">微信</span>
        </tabbar-item>
        <tabbar-item>
          <span slot="label">首页</span>
        </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem } from 'vux'
import ScanCode from './ScanCode'

export default {
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    ScanCode
  },
  data () {
    return {
      title: '码上详情'
    
    }
  }
}
</script>

<style>

</style>
