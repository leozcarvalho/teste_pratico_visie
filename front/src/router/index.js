import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'person-list',
    component: () => import('../pages/person-list.vue')
  },
  {
    path: '/person/:id',
    name: 'person-edit',
    component: () => import('../pages/person-item.vue')
  },
  {
    path: '/new-person',
    name: 'new-person',
    component: () => import('../pages/person-item.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
