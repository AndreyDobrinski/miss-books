import Vue from 'vue'
import VueRouter from 'vue-router'
import BookApp from '@/views/BookApp.vue'
import Home from '@/views/Home.vue'
import BookDetails from '@/views/BookDetails.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/book',
    component: BookApp
  },
  {
    path: '/book/:id',
    component: BookDetails
  },
]

const router = new VueRouter({
  routes
})

export default router
