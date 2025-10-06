import { createRouter, createWebHistory } from 'vue-router'
import Welcome from './views/Welcome.vue'
import List from './views/List.vue'

const routes = [
  { path: '/', component: Welcome },
  { path: '/list', component: List },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
