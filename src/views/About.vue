<template>
 <div class="navbar-fixed">
  <nav class="nav-wrapper white center flow-text black-text " style="border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;"> <p class="fa">Your Profile</p> </nav></div>
    <div class="container">
    
    <div class="col x s12 m7">
    <div class="card border">

      <div class="card-stacked">

      <div class="collection border"> 
        <div class="collection-item avatar"> 
         <img :src="`${aboutuser.avatar}`" alt="" class="materialboxed circle">
          <p class="title"> Hey there {{user.displayName}} </p>
          <p class="">Currently logged in as {{ user.email  }}</p>  
         </div>
         </div> 


        <div class="card-content">
          <div class="flex">
          <button class="btn-floating blue" @click="showconfirm=!showconfirm" > 
            
             <input type="file"  @change="handleChange"> <i class="material-icons">camera</i> <input> </button>
          
          <button v-if="showconfirm" class="btn-floating blue" @click="sendImage">
            <i class="material-icons">user</i>
          </button>

          <button class="btn-floating blue" @click="gotofotos">
            <i class="material-icons">camera</i>
          </button>

          <button class="btn-floating blue" @click="showInput=!showInput">
            <i class="material-icons">edit</i>
          </button>

          <button class="btn-floating blue" @click="handleClick">
            <i class="material-icons">logout</i>
          </button>
          </div>
          
          <div v-if="showInput" class="input-field  col s12">
            <div class="flex2">
            <input @keypress.enter="editDescription" class="welcome border" id="icon_prefix" required placeholder="Change your describtion" type="text" v-model="editedDescribtion" >
            <button @click="editDescription" class="btn-floating blue"><i class="material-icons">check</i>
            </button>
          </div></div>

          <p class="flow-text">{{aboutuser.describtion}}</p>
          <p class="flow-text"> Your subscriptions: {{aboutuser.subs.length}}</p>
      
        </div>
   
      </div>
    </div>
      <div class="row" >
      <div class="col s12 "  id='1'>
        <div class="card border " v-for="x in datafromdb" :key="x.id">
          
         <div class="collection border"> 
            <div class="collection-item avatar">  <img  :src="`${aboutuser.avatar}`" alt="" class="circle">
          <p class="title">{{aboutuser.displayName}} </p>
          <p>posted {{x.createdAt}} ago </p>
         </div>
         </div> 
          <div class="card-image ">
            <img class="materialboxed" @click="toLook(x.id)" alt='MYimage'  :src="`${x.foto}`"   >
            <a class="left btn-floating halfway-fab  black" @click="deletefoto(x.id)"><i class="material-icons">delete</i></a>
          </div>
          <p class="card-content2 flow-text " @click="toLook(x.id)">{{x.message}}</p>
        </div>
      </div>
</div>
</div>   




 

    </div>

</template>


<script>
import getUser from '../composables/getUser'
import useLogout from '../composables/useLogout'
import { useRoute, useRouter } from 'vue-router'
import firebase from '../firebase.js'
import { ref, onMounted, watch,onCreated ,computed} from 'vue';
import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
Capacitor, FilesystemDirectory } from "@capacitor/core";
import { formatDistanceToNow } from 'date-fns'
import useStorage from '../composables/useStorage'

export default {
  setup(){
    const { Camera, } = Plugins;
    const {filePath,url,uploadImage} =useStorage()
    let file =ref(null);
    let showconfirm = ref(false)
    let router=useRouter()
    const { user } = getUser()
    const { logout, error } = useLogout()
    const {projectFirestore} = firebase
    const datafromdb = ref([])
    let aboutuser = ref([])
    let foto = ref()
    let idof = ref()
    let editedDescribtion = ref()
    let showInput=ref(false)
    const fileError=ref(null)


    let editDescription=()=>{
        projectFirestore.collection(`${user.value.email}`).doc(idof.value).update({
                describtion: editedDescribtion.value,
            }).catch(err =>{
                console.log(err)
            })
            showInput.value=!showInput.value
    }


    projectFirestore.collection(`all-fotos`).where('createdBy','==',`${user.value.email}`)
      .get().then(snapshot => {
            snapshot.forEach(doc => {
              let smoothie = doc.data()
              smoothie.id = doc.id
              smoothie.createdAt= formatDistanceToNow(doc.data().createdAt.toDate())
              datafromdb.value.push(smoothie)
                })
              });
  
  projectFirestore.collection(`${user.value.email}`)
    .onSnapshot(snapshot =>{
            snapshot.forEach(doc=>{
              let g = doc.data()
              g.avatar=doc.data().avatar
              g.subs = doc.data().subs
              g.id = doc.id
              idof.value =doc.id
              aboutuser.value= g

            })})
    const types =['image/png','image/jpeg']

    let handleChange=(e)=>{
      let selected = e.target.files[0]
      console.log(selected)
      if (selected && types.includes(selected.type)){
        file.value =selected
        fileError.value=null

      }else{
        file.value= null
        fileError.value = 'please select an image file (png or jpeg)'
      }
    }
    let sendImage= async()=>{
      if(file.value){
        await uploadImage(file.value)
        console.log("image uploaded ,url:",url.value )
         projectFirestore.collection(`${user.value.email}`).doc(idof.value).update({
                avatar: url.value,
            }).catch(err =>{
                console.log(err)
            })
          M.toast({html: "Photo was taken "})

        console.log(user.value)
        //foto.value = []
      }
      
    }
    const addAvatar= async() =>{
       const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 20
        });
      
        foto.value=cameraPhoto.base64String
        M.toast({html: "Photo was taken "})
        projectFirestore.collection(`${user.value.email}`).doc(idof.value).update({
                avatar: foto.value,
            }).catch(err =>{
                console.log(err)
            })
        console.log(user.value)
        //foto.value = []

    }

        onMounted(()=>{
              $(document).ready(function(){
                $('.materialboxed').materialbox();
            });
        })

    let deletefoto=(x)=>{
      projectFirestore.collection(`all-fotos`).doc(x).delete()
      console.log('deleted')
      datafromdb.value = datafromdb.value.filter(f=>{
        return f.id != x
      })
    }
    let toLook =(c)=>{router.push({ name : 'look', params: { info: c } })}
    let gotofotos=()=>{router.push({name:'makefotos'})}
    let goback=()=>{router.go(-1)}

    const handleClick = async () => {
      await logout()
      router.push({name:'welcome'})
      console.log('logout')

    }
    return{file,fileError,gotofotos,sendImage ,showconfirm,  handleChange,toLook,deletefoto,goback,editedDescribtion,editDescription,showInput,user,foto,addAvatar,aboutuser,handleClick,logout,error,datafromdb,idof}
  }

}
</script>

<style scoped> 
.fa{font-family: 'Hammersmith One', sans-serif;}
.x{margin-top:5%;}
.border{border-radius: 15px;}
.collection {margin: 0;}
.collection .collection-item.avatar {min-height: 0px;}
.flex{
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
}
.card-content2 {padding: 12px;}

.flex2{
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.welcome  {
    display: block;
    margin: 20px 0 10px;
}
.welcome  {
    width: 80%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
}
input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=email]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {
     border-radius: 15px; 
     width: 80%;
} 
@media screen and (max-width: 767px) {
  .container{
      width: 95%;

  }
}
</style>