<template>
 <div class="navbar-fixed">
    <nav class="nav-wrapper white center flow-text black-text " style="border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;"> <p class="fa">Your favorite photos</p> </nav></div>
    <div class="container">

        <div v-if="!fotos.length" style="margin-top:10px" class="card border">
          <div class="card-content">
              <p style="text-align:center">Woops nothing to see here</p>
          </div>

        </div>

      <div v-else class="row" >
      <div class="col s12 "  id='1'>
        <div class="card border " v-for="x in fotos" :key="x.id">
          
         <div class="collection border" @click="testfunc(x.createdBy)"> 
          <div class="collection-item avatar">  <img :src="`data:image/png;base64,${x.avatar}`" alt="" class="circle">
          <p class="title">{{x.displayName}} </p>
          <p>posted {{x.createdAt}} ago </p>
         </div>
         </div> 
          <div class="card-image ">
            <img class=""  alt='MYimage' @click="toLook(x.idToSee)"  :src="`data:image/png;base64,${x.foto}`"   >
            <a class="left btn-floating halfway-fab  black" @click="delFromFavs([x.id,x.idToSee])"><i class="material-icons">delete</i></a>
          </div>
          <div class="card-content">
            <p style="padding-left:12px;" class="overflow flow-text " @click="toLook(x.idToSee)">{{x.message}}</p>
            <p style="padding-left:12px;" class="flow-text "  v-if="x.likedBy.length != 'undefined'">Liked by {{x.likedBy.length}} people</p>
   
            </div>
  

        </div>
      </div>
</div>

    </div>

</template>

<script>
import { ref, onMounted, watch,onCreated ,computed} from 'vue';
import getUser from '../composables/getUser'
import firebase from '../firebase.js'
import { useRoute, useRouter } from 'vue-router'

export default {
setup(){
    const { user } = getUser()
    const {projectFirestore} = firebase
    const fotos = ref([])
    let router=useRouter()

    projectFirestore.collection(`favs-of-${user.value.email}`).get()
      .then(snap=>{
        snap.forEach(doc=>{
          let fromDb = doc.data()
          fromDb.comments= doc.data().comments
          fromDb.id= doc.id
          fromDb.idToSee =doc.data().id
          fromDb.createdAt=doc.data().createdAt
          fromDb.createdBy=doc.data().createdBy
          fromDb.foto=doc.data().foto
          fromDb.likedBy=doc.data().likedBy
          fromDb.message=doc.data().message
          console.log(fromDb.createdBy)
          projectFirestore.collection(fromDb.createdBy).
          get().then(snap=>{
              snap.forEach(doc=>{
              let data=doc.data()
              fromDb.avatar= doc.data().avatar
              fromDb.displayName = doc.data().displayName
              fotos.value.push(fromDb)
              })
            })

        })
      })
      const delFromFavs=(x)=>{
        console.log(x)
        let f= x[0]
        projectFirestore.collection(`favs-of-${user.value.email}`).doc(x[0]).delete()
        fotos.value= fotos.value.filter(y=>{
          return y.id !== f
        })
        console.log(fotos.value)
        //test
        let newlike= likesfrom.value.filter(x=>{
        return x !== user.value.email
          })
          projectFirestore.collection(`all-fotos`).doc(id.value).update({
            likedBy:[...newlike]
          }) 
      }
      let toLook =(c)=>{router.push({ name : 'look', params: { info: c } })}

      
  return{fotos,user,projectFirestore,
    delFromFavs,toLook,router
  }
}
}
</script>

<style scoped>
.fa{
font-family: 'Hammersmith One', sans-serif;
}
.g{
object-fit: cover;  
}
.r{
  height: 400px;
}
.x{
  display: flex;
    height: 200px;
  align-items: center;
}
.row .col {
  padding: 0 .10rem;
}
.border{
    border-radius: 15px;
}
.collection {margin: 0;}
.collection .collection-item.avatar {
  padding-bottom: 10px;
  min-height: 0px;
}
.card{ margin: .1rem 0 0.2rem 0;}
@media screen and (max-width: 767px) {
  .container{
    width: 95%;
  }
}
</style>