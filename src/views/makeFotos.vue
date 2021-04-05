<template>
 <div class="navbar-fixed">
  <nav class="nav-wrapper white center flow-text black-text "> <p class="fa">Add Photo</p> </nav></div>

  <div class="container x">

     <form class="xe" v-on:submit='send'>

          <div class="input-field">
            <i class="material-icons prefix">message</i>
            <textarea id="message" class="materialize-textarea"  v-model='message'  ></textarea>
            <label for="message">Add Describtion</label>
          </div>
          <a class="btn hoverable  right" v-on:click="send">
            Send <i class="fas fa-paper-plane"></i>
          </a>
          <a class="btn hoverable  left" v-on:click="takePhoto">
            Take Photo <i class="fas fa-camera"></i>
          </a>

     </form>

    <ul>
      <li v-for="x in foto" :key="x">
      <div class="row f left">
      <div class="col left s12 m6 l6">
        <div class="card ">
            <div class="card-image hoverable ">
              <img  class="materialboxed activator " :src="`data:image/png;base64,${x}`" alt="image"  >
            </div>
     
          <div class="card-action center">
            <a href="" @click="delet(message)">Delete Photo</a>
          </div>
         <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Photo taken on {{Date().substring(3,21)}}<i class="material-icons right">close</i></span>
          <p>{{message}}</p>
        </div>
      </div>
        </div>
      </div>
        </li>
    </ul>

  </div>

    <div class="container">
      <div class="fixed-action-btn ">
        <router-link to="/"  class="btn-floating waves-effect waves-light btn-large hoverable blue">
          <i class="large  material-icons">keyboard_backspace</i>
        </router-link>
      </div>
    </div>
</template>

<script>

import {useRouter} from 'vue-router'
import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
Capacitor, FilesystemDirectory } from "@capacitor/core";
import { ref, onMounted, watch } from 'vue';
import { isPlatform } from '@ionic/vue';
import db from '../firebase.js'
export default {
  name: 'Home',
  setup(){
  const { Camera, } = Plugins;
    const foto = ref([]);
    const message = ref('');
    const router = useRouter();

    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 20
        });
      
        foto.value.push(cameraPhoto.base64String)
        M.toast({html: "Photo was taken "})


    };

    const delet=(c)=>{
      foto.value=[];
      message.value = c
    }

        const send = ()=>{
        db.collection('collectofcalclus').add({
                        date:Date().substring(3,21),
                        describtion: message.value,
                        foto:foto.value
                    }).catch(err =>{
                        console.log(err)})
                        
        M.toast({html: "Photo was added "})
          router.push({name:'Home'})
        }
       
      return {
        takePhoto,message,send,foto,delet
      };
  },
    methods:{
        created(){
              $(document).ready(function(){
                $('.materialboxed').materialbox();
              });
            } 
    }

}
</script>
<style scoped>
.fa{
  font-family: 'Hammersmith One', sans-serif;
  }
.x{
  margin-bottom: 5%;
}

.xe{
 margin-top: 5%;
}
.f{
  margin-top: 5%;
}
</style>