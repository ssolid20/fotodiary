<template>
  <div class="navbar-fixed">
  <nav class="nav-wrapper white center flow-text black-text " style="border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;"> <p class="fa">Search People</p> </nav></div>
    <div class="container">

       <div class="input-field  col s12">
          <input  class="welcome border" id="icon_prefix" required placeholder="Write Name" type="text" v-model="name" >
        </div>
         <!--<input class="welcome" type="text" required placeholder="Write nickname" v-model="name">-->

        
        <div v-for="x in findName" :key="x">

          <div class="collection border" @click="testfunc(x.email)">
            <div class="collection-item avatar">
              <img :src="`${x.avatar}`" alt="" class="circle">
              <span class="title">{{x.displayName}}</span>
              <p>Tap to see  profile<br>
              </p>
            </div>
          </div>

          <!-- <div class="card horizontal " @click="testfunc(x.email)"> {{x.displayName}} </div>-->
        </div>
    </div>
    
 

</template>

<script>

import { ref, onMounted, watch,onCreated ,computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'

import firebase from '../firebase.js'
import getUser from '../composables/getUser'
export default {
setup(){
    let test = ref([])
    let router = useRouter()
    let name = ref()
    let subs1 = ref([])
    const { user } = getUser()
    let {projectFirestore,projectAuth} = firebase
    projectFirestore.collection('allUsersThatSignedUp').onSnapshot(snapshot =>{
            snapshot.forEach(doc=>{
                if (doc.data().email !== user.value.email){
                  projectFirestore.collection(doc.data().email)
                    .onSnapshot(snapshot=>{
                      snapshot.forEach(x=>{
                          let f = x.data()
                          f.id= x.id
                          f.displayName = x.data().displayName
                          f.avatar = x.data().avatar
                          test.value.push(f)
                          console.log(x.data())
                      })
                    })
              }
            })})
    console.log(test.value)

    projectFirestore.collection(user.value.email).get()
      .then(snapshot=>{
        snapshot.forEach(doc=>{
          let g= doc.data().subs
          g.id = doc.id
          subs1.value = g
        })
        console.log(subs1.value)
      })

    test.value.forEach(x=>{
        console.log(x.email)
    })

    let testfunc =(x)=>{
        /*console.log(x)
        projectFirestore.collection(`${user.value.email}`).doc(subs1.value.id).update({
        
            subs:[...subs1.value,x[0]]


        })*/
        router.push({name:'profileof',params:{email:x}})

    }
    let goback=()=>{
      router.go(-1)
    }
    const findName = computed(() =>{
        return test.value.filter((x)=>{return x.displayName.match(name.value)} )})

    return{user,testfunc,router,test,projectFirestore,findName,name,goback}
}}
</script>

<style scoped>
.fa{
  font-family: 'Hammersmith One', sans-serif;
  }
.x{
    display: flex;
  }
.x1{
      margin-left: 50%;
  }
  .border{
    border-radius: 15px;
}
.collection .collection-item.avatar {
  min-height: 0px;
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


input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=email]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {

     border-radius: 15px; 
  
} 

</style>