<template>
<div class="navbar-fixed">
  <nav class="nav-wrapper white center flow-text black-text "> <p class="fa">Chat with {{profileof}}</p> </nav>


</div>

      <div class="test">
        <div class="  flex2">
           <button @click="goback"  class="btn-floating  blue">
             <i class=" material-icons">keyboard_backspace</i>
        </button>
          <input @keypress.enter="writeMessage" class="welcome border"  autocomplete="off" required placeholder="Write Message" type="text" v-model="message" >
            <button @click="writeMessage" class="btn-floating blue"><i class="material-icons">check</i></button>
        </div></div>
  

    <div class="container" >


      <div class="row" ref="row">
      <div class="col s6 "  id='1'>
        <div class="card border " v-for="x in InfoUser2.chats" :key="x.id">

          <div class="card-content">
            <p class=" flow-text ">{{x.writtenByDisplayName}} </p> said {{Date(x.createdAt)}}
            <p  class=" flow-text " >{{x.text}}</p>
        </div>
        </div>
      </div>


        <div class="col s6 "  id='1'>
        <div class="card border margintest" v-for="x in InfoUser1.chatsToUser2" :key="x.id">

          <div class="card-content">
            <p class=" flow-text ">You </p>said {{Date(x.createdAt)}}
            <p  class=" flow-text " >{{x.text}}</p>
        </div>
        </div>
      </div>
</div>



    </div>


</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import getUser from '../composables/getUser'
import { useRoute, useRouter } from 'vue-router'
import firebase from '../firebase.js'
import { ref, onMounted, watch,onCreated ,computed, onUpdated} from 'vue';
export default {
    setup(){
        let router = useRouter()
        let route=useRoute()
        const {projectFirestore,timestamp} = firebase
        const { user } = getUser()
        let profileof = ref(route.params.chatwith)
        let message =ref('')
        let datafromdb = ref([])
        const row =ref()
        let idofchat = ref()
        let InfoUser1=ref()
        let InfoUser2 = ref()
        console.log(profileof.value)




           projectFirestore.collection(user.value.email).onSnapshot(snap=>{
             snap.forEach(doc=>{
               let infoAboutUser1= doc.data()
               infoAboutUser1.id=doc.id
               infoAboutUser1.avatar=doc.data().avatar
               infoAboutUser1.displayName=doc.data().displayName
               infoAboutUser1.chats =doc.data().chats
               infoAboutUser1.chatsToUser2 = doc.data().chats.filter(x=>{
                return x.writtenTo == profileof.value
               })
               console.log(infoAboutUser1.chats)
               InfoUser1.value = infoAboutUser1
             })
           })

          projectFirestore.collection(profileof.value).onSnapshot(snap=>{
             snap.forEach(doc=>{
               let infoAboutUser2= doc.data()
               infoAboutUser2.id=doc.id
               infoAboutUser2.avatar=doc.data().avatar
               infoAboutUser2.displayName=doc.data().displayName
               infoAboutUser2.chats = doc.data().chats.filter(x=>{
                return x.writtenTo == user.value.email
               })
               InfoUser2.value = infoAboutUser2
             })
           })



     
          let writeMessage =()=>{
              let toSendByYou={
                text:message.value,
                createdAt:Date.now(),
                writtenTo:profileof.value,
                writtenToDisplayName:InfoUser2.value.displayName,
                writtenBy:user.value.email,
                writtenByDisplayName:user.value.displayName
              }
              //infoAboutUser1.value.chats.push(toSendByYou)
              projectFirestore.collection(user.value.email).doc(InfoUser1.value.id).update({
                chats:[...InfoUser1.value.chats,toSendByYou]
              }).catch(err =>{
                console.log(err)
            })
            message.value=""
              const chat = document.querySelector('.row')
            row.value.scrollIntoView({block: "end",behavior:"smooth"})

          }




      let goback=()=>{router.go(-1)}

        return{writeMessage,row,
           message,timestamp,InfoUser1,InfoUser2, router,route,user,projectFirestore,profileof,datafromdb,idofchat,goback
        }
    }
}
</script>

<style scoped>
.border{
    border-radius: 15px;
}
.margintest{margin-top: 15%;}
.flex2{
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
 
}
.test{
position:sticky;
bottom:0; 
width: 100%;

}
.fa{font-family: 'Hammersmith One', sans-serif;}

  .welcome  {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome  {
    text-align: center;
    width: 90%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }


input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=email]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {
    width: 80%;
     border-radius: 15px; 
  
} 
</style>