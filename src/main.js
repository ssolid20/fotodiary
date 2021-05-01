import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './firebase'
let {projectAuth} = firebase
import { defineCustomElements } from '@ionic/pwa-elements/loader';
let app

projectAuth.onAuthStateChanged(() => {
    if (!app) {app = createApp(App).use(store).use(router).mount('#app')}})

//makes work camera on pc but disables camera on mobile
//defineCustomElements(window);

