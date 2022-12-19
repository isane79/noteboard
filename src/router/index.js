import { createRouter, createWebHistory } from 'vue-router'
import NoteboardView from '../views/NoteboardView.vue'
import WriteView from '../views/WriteView.vue'
import ReadView from '../views/ReadView.vue'
import DashboardView from '../views/DashboardView.vue'
import NoteView from '../views/NoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'noteboard',
      path: '/',
      component: NoteboardView
    }
    ,
    {
      name: 'write',
      path: '/write',
      component: WriteView
    },
    {
      name: 'read',
      path: '/read/:id?',
      component: ReadView,
    },
    {
      name: 'note',
      path: '/note',
      component: NoteView,
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: DashboardView
    }
  ]
})

export default router
