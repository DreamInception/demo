<template>
  <div class="com-app">
    <com-header></com-header>
    <div class="maincontent">
    <com-sider class="left"></com-sider>
    <transition name="toggleArrow">
      <div class="right">
         <router-view class="child-view"></router-view>
      </div>
    </transition>
      </div>
  </div>
</template>
<script>
import Header from './components/header'
import Sider from './components/sider'
export default {
  data(){
    return {};
  },
  computed: {

  },
  components: {
    comHeader: Header,
    comSider: Sider
  },
  methods: {
           initpage: function() {
                var height = document.body.clientHeight || document.documentElement.clientHeight,
                header_height = document.getElementsByClassName("header").offsetHeight,
                cal_height = height-header_height+10;
              	document.getElementsByClassName("maincontent").offsetHeight = cal_height;
	              document.getElementsByClassName("left").offsetHeight = cal_height;
	              document.getElementsByClassName("right").offsetHeight = cal_height;
           },
  },
  mounted: function(){
           this.initpage();

  }
}
</script>
<style lang="scss">
  @import "../static/css/app.scss";
  @import "../static/css/base/min.scss";
</style>
