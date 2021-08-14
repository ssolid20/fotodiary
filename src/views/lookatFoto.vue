<template>
  <div class="navbar-fixed">
  <nav class="nav-wrapper  white center flow-text black-text " style="border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;"> <p class="fa">PhotoDiary</p> </nav></div>
    <div class="container">
      <div class="row" >
      <div class="col s12 "  id='1'>
        <div class="card border "  >
          
         <div class="collection border" @click="testfunc(foto.createdBy)"> 
          <div class="collection-item avatar">  <img :src="`${aboutproper.avatar}`" alt="" class="circle">
          <p class="title">{{aboutproper.displayName}} </p>
          <p>posted {{foto.createdAt}} ago </p>
         </div>
         </div> 
          <div class="card-image ">
            <img class="materialboxed"  alt='MYimage'   :src="`${foto.foto}`"   >
            <a v-if="changebutt ==  true" @click="likedAdd" class="left btn-floating halfway-fab  red"><i class="material-icons">favorite</i></a>
            <a v-else @click="DelLike" class="left btn-floating halfway-fab  yellow"><i class="material-icons">stars</i></a>

          </div>
          <div class="card-content">
            <p  class=" flow-text " >{{foto.message}}</p>
            <p  class="   flow-text "  v-if="foto.likedBy.length != 'undefined'">Liked by {{foto.likedBy.length}} people</p>
            </div>
        </div>
      </div>
</div>

  <div class="row">
    <div class="col s12 m7">
      <div class="card border">

        <div class="card-content flex2" >
          <input class="welcome border" id="icon_prefix" autocomplete="off" required placeholder="Write Comment" type="text" v-model="comment" >
            <button @click="editDescription" class="btn-floating blue"><i class="material-icons">check</i></button>
        </div>

      </div>
    </div>
  </div>

  <div class="row">
    <div class="col s12 m7">
      <div class="card border">

        <div class="card-content" v-for="x in foto.comments" :key="x">
          <p>
            <span @click="testfunc(x.email)" class="flow-text">{{x.displayaName}}</span> commented {{x.time}} </p>
            <p class="flow-text">{{x.text}}</p>
         
        </div>

      </div>
    </div>
  </div>


</div>


</template>

<script>
import firebase from '../firebase.js'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref ,computed} from 'vue'
import getUser from '../composables/getUser'
import { formatDistanceToNow ,parseISO} from 'date-fns'

export default {
  setup(){
    let route= useRoute()
    let router = useRouter()
    let id = ref(route.params.info)
    console.log(id.value)
    const { user } = getUser()
    let {projectFirestore,timestamp} = firebase;
    let foto=ref()
    let aboutproper=ref()
    let likesfrom=ref([])
    let comment =ref()
    let changebutt=ref(true)




        projectFirestore.collection(`all-fotos`).doc(id.value).onSnapshot((doc) => {
              let f = doc.data()
              f.comments=doc.data().comments
              //test

              f.createdAt = formatDistanceToNow(doc.data().createdAt.toDate())
              f.createdBy = doc.data().createdBy
              f.foto=doc.data().foto
              f.likedBy=doc.data().likedBy
              likesfrom.value = doc.data().likedBy
              console.log(likesfrom.value)
              if(doc.data().likedBy.includes(user.value.email)){
                changebutt.value=false
                console.log(changebutt.value)

              }
              f.message=doc.data().message
              foto.value=f
              projectFirestore.collection(`${foto.value.createdBy}`).get()
                .then(snap=>{
                  snap.forEach(x=>{
                    let q =x.data()
                    q.id =x.id
                    q.avatar= x.data().avatar
                    q.displayName =x.data().displayName
                    aboutproper.value= q

                  })
                })
                
            })



    let editDescription=()=>{
        let addComment ={
          email:user.value.email,
          displayaName:user.value.displayName,
          text:comment.value,
          time: Date.now()


        }
        projectFirestore.collection(`all-fotos`).doc(id.value).update({
          comments:[...foto.value.comments,addComment]
        })
        comment.value=''

    }
    let likedAdd=()=>{
      projectFirestore.collection(`all-fotos`).doc(id.value).update({
        likedBy:[...likesfrom.value,user.value.email]
      })  
      changebutt.value=false
      projectFirestore.collection(`favs-of-${user.value.email}`).add({
        comments:foto.value.comments,
        createdAt:foto.value.createdAt,
        createdBy:foto.value.createdBy,
        likedBy:foto.value.likedBy,
        foto:foto.value.foto,
        message:foto.value.message,
        id:id.value
      
    }).catch(err =>{
      console.log(err)
      })


    }
    let DelLike=()=>{
      let newlike= likesfrom.value.filter(x=>{
        return x !== user.value.email
      })
      projectFirestore.collection(`all-fotos`).doc(id.value).update({
        likedBy:[...newlike]
      })  
      changebutt.value=true
      projectFirestore.collection(`favs-of-${user.value.email}`).where('id','==',id.value).delete()


    }

    // //  const fixedComments = computed(() =>{
    // //    foto.value.comments.forEach(x=>{
    // //      console.log(Date(x.time.toString()))
    // //      let b =Date(x.time)
    // //      console.log(b)
    // //      let h =1529644667834
    // //      console.log(formatDistanceToNow(h
         
         
         
         
         
    // //      .toDate()))
    // //      console.log(x.time)
    // //    })
    //    return foto.value.comments
    //  })

    let testfunc =(x)=>{router.push({name:'profileof',params:{email:x}})}
    let goback=()=>{router.go(-1)}


    onMounted(()=>{

          $(document).ready(function(){
            $('.materialboxed').materialbox();
          });
    })
    return{changebutt,DelLike,likedAdd,formatDistanceToNow,
    comment,router,route,id,user,projectFirestore,foto,aboutproper,testfunc,goback,editDescription,parseISO}
  }





    /*methods:{
     /* addToFav(){
        db.collection('fav').add({
                date:this.date,
                describtion: this.des,
                foto:this.foto
            }).catch(err =>{
                console.log(err)
            })
      M.toast({html: "This photo was added to favorite list"})
      },
       delFav(){
          db.collection('collectofcalclus').doc(this.info0).delete()
            .then(() => {
            M.toast({html: "This photo was deleted"})
                this.$router.push({name:"Home"})
            }).catch(err => {
                console.log(err)
            })

      },

    },*/



    
    
    
}
</script>

<style scoped>
.fa{
font-family: 'Hammersmith One', sans-serif;
}
.test{
    padding-top: 5%;
  max-height: 400px;
  max-width: 80%;
   display: block;
  margin-left: auto;
  margin-right: auto;
}
.test2{
  margin-left: 5px;
}
.x{
  margin-top: 5%;
}
.margin{
  padding-left: 10px;
}
.collection {margin: 0;}
.collection .collection-item.avatar {
  min-height: 0px;
}
.border{
    border-radius: 15px;
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
  .flex2{
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}
input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=email]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {
    width: 80%;
     border-radius: 15px; 
  
} 
@media screen and (max-width: 767px) {
  .container{
      width: 100%;
      margin-left: 0%;
      margin-right: 0%;

  }
}

</style>