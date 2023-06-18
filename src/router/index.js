import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FeaturesView from '../views/FeaturesView.vue'
import StonesView from '../views/StonesView.vue'
import MapView from '../views/MapView.vue'
import SavedView from '../views/SavedView.vue'
import OfflineView from '../views/OfflineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/features',
      name: 'features',
      component: FeaturesView
    },
    {
      path: '/stones',
      name: 'stones',
      component: StonesView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/saved',
      name: 'saved',
      component: SavedView
    },
    {
      path: '/offline',
      name: 'offline',
      component: OfflineView
    },
  ]
})

export default router
