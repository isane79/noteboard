import { createRouter, createWebHistory } from 'vue-router'
import NoteboardView from '../views/NoteboardView.vue'
import WriteView from '../views/WriteView.vue'
import ReadView from '../views/ReadView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'noteboard',
      component: NoteboardView
    }
    ,
    {
      path: '/write',
      name: 'write',
      component: WriteView
    },
    {
      name: 'read',
      path: '/read',
      component: ReadView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

export default router
