// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
Vue.config.debug = true
window.log = console.log
import $ from 'jquery'
import jQuery from 'jquery'

let data = {
  el: '#app',
  router
}

new Vue(data).$mount('#app')
