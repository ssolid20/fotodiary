<template>
 <div class="navbar-fixed">
  <nav class="nav-wrapper  white center flow-text black-text " style="border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;"> <p class="fa">PhotoDiary</p> </nav></div>
  <div class="container">
      <div class="row" >
      <div class="col s12 "  id='1'>
        <div class="card border " v-for="x in datefromfb" :key="x.id">
          
         <div class="collection border" @click="testfunc(x.createdBy)"> 
          <div class="collection-item avatar">  <img :src="`data:image/png;base64,${x.avatar}`" alt="" class="circle">
          <p class="title">{{x.displayName}} </p>
          <p>posted {{x.createdAt}} ago </p>
         </div>
         </div> 
          <div class="card-image ">
            <img class=""  alt='MYimage' @click="toLook(x.id)"  :src="`data:image/png;base64,${x.source}`"   >

          </div>
          <div class="card-content">
            <p style="padding-left:12px;" class="overflow flow-text " @click="toLook(x.id)">{{x.message}}</p>
            <p style="padding-left:12px;" class="flow-text "  v-if="x.likedBy.length != 'undefined'">Liked by {{x.likedBy.length}} people</p>
   
            </div>
  

        </div>
      </div>
</div>
</div>



</template>

<script>

import { ref, onMounted, watch,onCreated ,computed} from 'vue';
import M from 'materialize-css'
import { useRoute, useRouter } from 'vue-router'
import { formatDistanceToNow } from 'date-fns'

import firebase from '../firebase.js'
import getUser from '../composables/getUser'

export default {
  setup(){
      let router = useRouter()
      const { user } = getUser()
      let {projectFirestore,projectAuth} = firebase
      const datefromfb = ref([]);
      const test = ref([])
      let ok = ref(false)
              let changebutt = ref(true)


      projectFirestore.collection(user.value.email).get()
        .then(snap=>{
          snap.forEach(doc=>{
            let subs1 = doc.data().subs
            subs1.forEach(x=>{
              projectFirestore.collection(`all-fotos`).where('createdBy','==',x)
                     .onSnapshot(snap=>{
                       snap.forEach(z=>{
                      let foto = doc.data()
                       foto.message =z.data().message
                       console.log(foto.message)
                       foto.createdBy= z.data().createdBy
                       foto.likedBy = z.data().likedBy
                       console.log(z.data().likedBy)
                       foto.createdAt= formatDistanceToNow(z.data().createdAt.toDate())
                       foto.source = z.data().foto
                       foto.id = z.id
                        projectFirestore.collection(foto.createdBy)
                          .get().then(snap=>{
                            snap.forEach(doc=>{
                              let data=doc.data()
                              console.log(foto)
                              foto.avatar= doc.data().avatar
                              foto.displayName = doc.data().displayName
                              console.log(foto)
                              datefromfb.value.push(foto)
                            })
                          })
                       console.log(foto)
                       console.log(datefromfb.value)
                       //datefromfb.value.push(foto)
                       console.log(datefromfb.value)



                      })
                   })
            })
          })
        })

      let likepressed=(x)=>{
        changebutt.value=!changebutt.value
      }

      console.log(datefromfb.value)
     
      let toLook =(c)=>{router.push({ name : 'look', params: { info: c } })}
      let testfunc =(x)=>{router.push({name:'profileof',params:{email:x}})}

       return {ok,test,datefromfb,toLook,projectFirestore,projectAuth,testfunc,likepressed,changebutt}
  },
  mounted(){

    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);
          $('.fixed-action-btn').floatingActionButton({
            toolbarEnabled: false,
            direction:'up',
            hoverEnabled:false
          });

          $(document).ready(function(){
            $('.tabs').tabs({swipeable:true});
          });
    
           $(document).ready(function(){
            $('.modal').modal();
          });
       
  }
}
</script>

<style scoped>
.fa{
font-family: 'Hammersmith One', sans-serif;
}

.color{
  color: #2196f3;
}
.g{
object-fit: cover;  
}
nav ul li {
  
    padding: 10px;
}
.border{
    border-radius: 15px;
}
.r{
  height: 400px;
}
.x{
  display: flex;
    height: 200px;
  align-items: center;
}
.collection {margin: 0;}
.collection .collection-item.avatar {
  padding-bottom: 10px;
  min-height: 0px;
}
.row .col {
  padding: 0 .10rem;
}
.margin{
  padding-left: 10px;
}
.overflow{
  white-space:nowrap;
  overflow:hidden;
  text-overflow: ellipsis
}
.flex2{
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}
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
.card .card-content {padding: 12px; margin-bottom: 10px;}
.card{ margin: .1rem 0 0.2rem 0;}
@media screen and (max-width: 767px) {
  .container{
      width: 95%;

  }
}
</style>
