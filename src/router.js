import Home from './Home.vue'
import Login from './Login.vue'
import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
