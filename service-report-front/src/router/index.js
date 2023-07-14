import { createRouter, createWebHashHistory } from 'vue-router'
import ReportView from '../views/ReportView.vue'
import MonthReportView from '../views/MonthReportView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ReportView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView
  },
  {
    path: '/month',
    name: 'month',
    component: MonthReportView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
