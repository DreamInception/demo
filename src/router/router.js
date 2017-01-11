import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Order from '../page/order'
import ResourceManage from '../page/resource-manage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      // {path: '/page/order', name: 'order', component: Order},
      {path: '/page/resource-manage', name: 'resource-manage', component: ResourceManage},
      {path: '', name: 'default', component: ResourceManage}
    ]
  }
]
const router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active',
  history: true
})
export default router
