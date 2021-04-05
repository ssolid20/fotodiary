<template>
  <div class="navbar-fixed">
  <nav class="nav-wrapper  white center flow-text black-text "> <p class="fa">Posted on {{date}}</p> </nav></div>
    <div class="container">
    <img class="test materialboxed"  :src="foto">
    <a class=" x black waves-light btn-floating " @click="delFav()"> <i class="fas fa-trash"></i></a>

    <p v-if='des' class="flow-text">Describtion: {{des}}</p>
</div>
    <div class="container">
      <div class="fixed-action-btn ">
        <router-link :to="{name:'favorite'}"  class="btn-floating waves-effect waves-light btn-large hoverable blue">
          <i class="large  material-icons">keyboard_backspace</i>
        </router-link>
      </div><!--toadddad-->
    </div>
</template>

<script>
import db from '../firebase.js'

export default {
    
    data(){
      return {
        info0 :this.$route.params.id,
        des:'',
        date:'',
        foto:'',
      }
    },
    methods:{
      addToFav(c){
        db.collection('fav').add({
                date:this.date,
                describtion: this.des,
                foto:this.foto
            }).catch(err =>{
                console.log(err)
            })

      console.log('added to fav')
      },
      delFav(){
          db.collection('fav').doc(this.info0).delete()
            .then(() => {
            M.toast({html: "This photo was deleted from favorite list"})
                this.$router.push({name:"favorite"})
            }).catch(err => {
                console.log(err)
            })

      },

    },
    mounted(){
        db.collection('fav').doc(this.info0).get()
        .then((doc) => {
            this.des=doc.data().describtion;
            this.date=doc.data().date;
            this.foto =doc.data().foto
            
        }).catch(err => {
            console.log(err)
        })


        $(document).ready(function(){
          $('.materialboxed').materialbox();
        });

    }
    
    
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
.x{
  margin-top: 5%;
}
@media screen and (max-width: 767px) {
    .test{
          max-height: 100%;
    max-width: 100%;
         margin-left: none;
    margin-right: none;
    }
}
</style>