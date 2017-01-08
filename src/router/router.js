import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Order from '../page/order'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {path: '/order', name: 'order', component: Order}
    ]
  }
]
const router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active',
  history: true
})
export default router