// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
import $ from 'jquery'
Vue.config.debug = true
window.log = console.log

let data = {
  el: '#app',
  router
}

new Vue(data).$mount('#app')
