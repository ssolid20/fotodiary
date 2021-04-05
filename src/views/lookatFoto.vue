<template>
  <div class="navbar-fixed">
  <nav class="nav-wrapper  white center flow-text black-text "> <p class="fa">Posted on {{date}}</p> </nav></div>
    <div class="container">
    <img class="test materialboxed"  :src="foto">
    <a class=" x test2 red waves-light btn-floating " @click="addToFav"> <i class="fas fa-heart"></i></a>
    <a class=" x black waves-light  left btn-floating " @click="delFav"> <i class="fas fa-trash"></i></a>

    <p v-if='des' class="flow-text x">Describtion: {{des}}</p>
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
import db from '../firebase.js'

export default {
    
    data(){
      return {
        info0 :this.$route.params.info,
        des:'',
        date:'',
        foto:'',
      }
    },
    methods:{
      addToFav(){
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

    },
    mounted(){
        db.collection('collectofcalclus').doc(this.info0).get()
        .then((doc) => {
            this.des=doc.data().describtion;
            this.date=doc.data().date;
            this.foto = `data:image/png;base64,${doc.data().foto}`
            
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
.test2{
  margin-left: 5px;
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