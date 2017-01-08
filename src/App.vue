<template>
  <div class="com-app">
  <com-header></com-header>
  <com-sider></com-sider>

  </div>
</template>
<script>
import Header from './components/header'
import Sider from './components/sider'
import Order from './page/order'
export default {
  data(){
    return {};
  },
  computed: {

  },
  components: {
    comHeader: Header,
    comSider: Sider,
    default: Order
  },
  methods: {

  }
}
</script>
<style lang="sass">
  @import "../static/css/app.scss"
</style>
