import { createRouter, createWebHistory } from 'vue-router'
import makeFotos from '../views/makeFotos.vue';
import App from '../App.vue'
import Home from '../views/Home.vue';
import favorite from '../views/favorite.vue';
import welcome from '../views/Welcome.vue'
import navbar from '../views/Navbar.vue'
import firebase from '../firebase'
import look from '../views/lookatFoto.vue';
import lookatFavs from '../views/lookatFoto2.vue';
import search from '../views/search.vue';
import profileof from '../views/ProfoleOf.vue';
import chat from '../views/chat.vue';
let {projectAuth} = firebase

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if (!user) {
    next({ name: 'welcome' })
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const routes = [  
  {
    path: '/home/',
    name: 'Home',
    component: Home,
    beforeEnter:requireAuth

  },
  {
    path: '/profileof/:email',
    name: 'profileof',
    component: profileof,
    beforeEnter:requireAuth

  },
  {
    path: '/',
    name: 'welcome',
    component: welcome,
    beforeEnter:requireNoAuth
  },
  {
    path:"/makefotos",
    name:'makefotos',
    component:makeFotos
  },
  {
    path:"/search",
    name:'search',
    component:search
  },
  {
    path:"/chat/:chatwith",
    name:'chat',
    component:chat
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
  linkExactActiveClass:"activeLink",
  linkActiveClass:"activeLink2",
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
