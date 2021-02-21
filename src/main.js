import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { defineCustomElements } from '@ionic/pwa-elements/loader';

createApp(App).use(store).use(router).mount('#app')
//makes work camera on pc but disables camera on mobile
defineCustomElements(window);

