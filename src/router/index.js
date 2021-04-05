import { createRouter, createWebHistory } from 'vue-router'
import makeFotos from '../views/makeFotos.vue';
import App from '../App.vue'
import Home from '../views/Home.vue';
import favorite from '../views/favorite.vue';
import look from '../views/lookatFoto.vue';
import lookatFavs from '../views/lookatFoto2.vue';
const routes = [  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/makefotos",
    name:'makefotos',
    component:makeFotos
  },
  {
    path:"/lookatfoto/:info",
    name:'look',
    component:look
  },
  {
    path:"/lookatFavFoto/:id",
    name:'lookatfavs',
    component:lookatFavs
  },
  {
    path:"/favorite",
    name:'favorite',
    component:favorite
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
