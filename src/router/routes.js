import AboutMe from '@/components/aboutMe/aboutMe.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {path: '/', name: 'Home', component: AboutMe},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router