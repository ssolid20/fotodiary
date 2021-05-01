<template>
   <div class="navbar-fixed">
    <nav class="nav-wrapper white center flow-text black-text " style="border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;"> <p class="fa">Profile of {{aboutuser.displayName}}</p> </nav></div>
    <div class="container">
    
    <div class="col  s12 m7">
    <div class="card border">

      <div class="card-stacked">

      <div class="collection border"> 
        <div class="collection-item avatar"> 
         <img :src="`data:image/png;base64,${aboutuser.avatar}`" alt="foto" class="materialboxed circle">
          <p class="title">  {{aboutuser.displayName}} </p>
         </div>
         </div> 


        <div class="card-content">
          <div class="flex2">
        <button v-if="!toChangeButton" class="btn border btest large" @click="followUser(profileof)">Follow</button>
        <button v-if="toChangeButton" class="btn border btest red large" @click="unFollowUser(profileof)">Unfollow</button>
       <button class="btn blue border btest" @click="startChat(profileof)">Chat 
         <i class="fas fa-comments"></i>
        </button>
          </div>
        <p>About {{aboutuser.displayName}}:</p>
        <p>{{aboutuser.describtion}}</p>
        <p>Subscriptions of {{aboutuser.displayName}} : {{aboutuser.subs.length}} </p>
      
        <p>Photos of {{aboutuser.displayName}}</p>
        </div>
   
      </div>
    </div>

      <div class="row" >
      <div class="col s12 "  id='1'>
        <div class="card  border " v-for="x in fotofromdb" :key="x.id">
          
         <div class="collection border"> 
            <div class="collection-item avatar">  <img :src="`data:image/png;base64,${aboutuser.avatar}`" alt="" class="circle">
          <p class="title">{{aboutuser.displayName}} </p>
          <p>posted {{x.createdAt}} ago </p>
         </div>
         </div> 
          <div class="card-image ">
            <img  @click="toLook(x.id)"  alt='MYimage'  :src="`data:image/png;base64,${x.foto}`"   >
          </div>
          <div class="card-content2">
            <p class="  flow-text" @click="toLook(x.id)">{{x.message}}</p>

          </div>
        </div>
      </div>
</div>
</div>



  </div>
            
    <div style="border-bottom:2px solid white;margin-top:10px" class="test navbar-fixed  white">
   <nav class="nav-wrapper white flex3 " style="border-top-left-radius: 15px;border-top-right-radius: 15px;">
     <ul class="flex3">
            <li><router-link to="/" id='test' class=" z-depth-0 btn-floating white "><i class="material-icons white" style="color:#2196f3">home</i></router-link></li>
            <li><router-link :to="{name:'search'}" class=" z-depth-0 btn-floating white"><i style="color:#2196f3" class="material-icons ">search</i></router-link></li>
            <li><router-link to='/favorite' style="border: black;" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">favorite</i></router-link></li>
            <li><router-link to="/makefotos" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">add_a_photo</i></router-link></li>
            <li><router-link to="/about" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">person</i></router-link></li>

        </ul>
   </nav>
  </div> 


</template>

<script>
import getUser from '../composables/getUser'
import useLogout from '../composables/useLogout'
import { useRoute, useRouter } from 'vue-router'
import firebase from '../firebase.js'
import { formatDistanceToNow } from 'date-fns'

import { ref, onMounted, watch,onCreated ,computed} from 'vue';
export default {
    setup(){
        let route = useRouter()
        let router=useRoute()
        const { user } = getUser()
        const { logout, error } = useLogout()
        const {projectFirestore} = firebase
        let profileof = ref(router.params.email)
        console.log(profileof.value)
        const fotofromdb = ref([])
        let aboutuser = ref()
        let idfordatabase = ref()
        let toChangeButton=ref()



        projectFirestore.collection(user.value.email)
            .onSnapshot(snap=>{
                snap.forEach(doc=>{
                    let h=doc.data()
                    h.subs=doc.data().subs
                    h.id = doc.id
                    idfordatabase.value= h

                })
                console.log(idfordatabase.value)
                idfordatabase.value.subs.forEach(x=>{
                    if (x == profileof.value){
                        toChangeButton.value=true
                        console.log(toChangeButton.value)
                    }
                })

            })
    


        projectFirestore.collection(`all-fotos`).where('createdBy','==',profileof.value).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let smoothie = doc.data()
              smoothie.id = doc.id
              smoothie.createdAt= formatDistanceToNow(doc.data().createdAt.toDate())
              fotofromdb.value.push(smoothie)

                })
                console.log(fotofromdb.value)
              });

        projectFirestore.collection(profileof.value)
            .get().then(snapshot =>{
                    snapshot.forEach(doc=>{
                    let g = doc.data()
                    g.id = doc.id
                    aboutuser.value = (g)
                    console.log(aboutuser.value.subs)
                    })})


        let startChat=(x)=>{
          route.push({name:'chat',params:{chatwith:x}})

        }

      let toLook =(c)=>{route.push({ name : 'look', params: { info: c } })}


        let goback=()=>{route.go(-1)}

        let followUser =(x)=>{
            console.log(x)
            projectFirestore.collection(`${user.value.email}`).doc(idfordatabase.value.id).update({
                subs:[...idfordatabase.value.subs,x]
            })

        }
        let unFollowUser=(x)=>{
            console.log('unfollow :' + x)
            let newSubs = idfordatabase.value.subs.filter(f=>{
                return f != x
            })
            console.log(newSubs)
            projectFirestore.collection(`${user.value.email}`).doc(idfordatabase.value.id).update({
                subs:[...newSubs]
            })
            toChangeButton.value=false
        }
        onMounted(()=>{
              $(document).ready(function(){
                $('.materialboxed').materialbox();
            });
        })

        return{toLook,startChat,toChangeButton,unFollowUser,route,idfordatabase,followUser,goback,user,projectFirestore,profileof,router,fotofromdb,aboutuser}
    }

}
</script>

<style scoped>
.border{
    border-radius: 15px;
}
.btest{
    width: 45%;
    margin-bottom: 15px;
}
.fa{
font-family: 'Hammersmith One', sans-serif;
}
.card .card-content2 {padding: 12px;}
.test{
  bottom: 0;
  position: fixed;
  width: 100%;
    overflow: hidden;

}
.flex3{
  display: flex;
  justify-content: space-around;
}
.collection {margin: 0;}
.collection .collection-item.avatar {
  min-height: 55px;
}
.flex2{
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}
@media screen and (max-width: 767px) {
  .container{
      width: 95%;

  }
}
</style>