import { createStore } from 'vuex'
import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
  Capacitor, FilesystemDirectory } from "@capacitor/core";
import { ref, onMounted, watch } from 'vue';
import { isPlatform } from '@ionic/vue';
    
export default createStore({
  state: {
    fotos:[]
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
  }
})
