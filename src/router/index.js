import Vue from 'vue'
import Router from 'vue-router'
import Zodiac from '@/components/Zodiac'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Zodiac',
      component: Zodiac
    }
  ]
})
