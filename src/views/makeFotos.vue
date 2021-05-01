<template>
 <div class="navbar-fixed">
  <nav class="nav-wrapper white center flow-text black-text " style="border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;"> <p class="fa">Add Photo</p> </nav></div>

  <div class="container ">

 
    <ul>
      <li v-for="x in foto" :key="x">
      <div class="row" >
      <div class="col s12 "  id='1'>
        <div class="card border ">
          
         <div class="collection border" @click="testfunc(x.email)"> 
          <div class="collection-item avatar">  <img :src="`data:image/png;base64,${aboutuser.avatar}`" alt="" class="circle">
          <p class="title">{{aboutuser.displayName}} </p>
         </div>
         </div> 
          <div class="card-image ">
            <img class=""  alt='MYimage' @click="toLook(x.id)"  :src="`data:image/png;base64,${x}`"   >
          </div>
          <div class="">
            <p  class="card-content flow-text " >{{message}}</p>
   
            
            </div>
  

        </div>
      </div>
</div>
        </li>
    </ul>

    <div class="card border">
      <div class="card-content">
     <form class="xe" v-on:submit='handleSubmit'>

       <div class="input-field  col s12">
          <input class="welcome border"  autocomplete="off" required placeholder="Write Describtion" type="text" v-model="message" >
        </div>
          <a class="btn-floating blue   right" v-on:click="handleSubmit">
             <i class="material-icons">send</i>
          </a>
          <a class="btn-floating blue left" v-on:click="takePhoto">
            <i class="material-icons">photo_camera</i>
          </a>

     </form>
  </div>
  </div>

  </div>

 

</template>

<script>

import {useRouter} from 'vue-router'
  import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
  Capacitor, FilesystemDirectory } from "@capacitor/core";
import { ref, onMounted, watch } from 'vue';
import useCollection from '../composables/useCollection'
import  firebase  from '../firebase'
import getUser from '../composables/getUser'
export default {
  name: 'Home',
  setup(){
  const { Camera, } = Plugins;
    const foto = ref([]);
    const message = ref('');
    const { user } = getUser()
    const router = useRouter();
    let aboutuser =ref()
    let {timestamp,projectFirestore} =firebase


 projectFirestore.collection(`${user.value.email}`)
    .onSnapshot(snapshot =>{
            snapshot.forEach(doc=>{
              let g = doc.data()
              g.avatar=doc.data().avatar
              g.subs = doc.data().subs
              g.id = doc.id
              aboutuser.value= g

            })})


    let goback=()=>{router.go(-1)}



    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 20
        });
        foto.value = []
        foto.value.push(cameraPhoto.base64String)
        M.toast({html: "Photo was taken "})


    };


    console.log(user.value.email)
    const { addDoc, error1} = useCollection(`all-fotos`)
    // refs
    const mes = ref('')
    const handleSubmit = async () => {
      const chat = {
        message: message.value,
        createdAt: timestamp(),
        foto:foto.value,
        createdBy:user.value.email,
        likedBy:[],
        comments:[]
      }
      await addDoc(chat)
      console.log('addde to firestores')
      M.toast({html: "Photo was added "})
      router.push({name:"Home"})

      if (!error1.value) {
        message.value = ''
      }
    }
    const delet=(c)=>{
      foto.value=[];
      message.value = c
    }       
      return {goback,
        aboutuser,takePhoto,message,foto,delet,user,handleSubmit,router
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
 .border{border-radius: 15px;}

.x{
  margin-bottom: 5%;
}
.fa{
font-family: 'Hammersmith One', sans-serif;
}
.xe{
 margin-top: 5%;
}
.f{
  margin-top: 5%;
}
  .welcome  {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome  {
    text-align: center;
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }

.border{border-radius: 15px;}
.collection-item.avatar {min-height: 60px;  padding-bottom: 10px;}
.collection {margin: 0;}

input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=email]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {

     border-radius: 15px; 
  
} 
.col{
  padding: 0;
}
.card{
  width: 100%;
}
@media screen and (max-width: 767px) {
  .container{
      width: 95%;
      

  }
}
</style>