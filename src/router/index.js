import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/TodoList',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "TodoList" */ '../views/TodoList.vue')
  },
  {
    path: '/IssueList',
    name: 'IssueList',
    component: () => import(/* webpackChunkName: "IssueList" */ '../views/IssueList.vue')
  },
  {
    path: '/TodosIssues',
    name: 'TodosIssues',
    component: () => import(/* webpackChunkName: "TodosIssues" */ '../views/TodosIssues.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
