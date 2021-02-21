<template>
 <div class="navbar-fixed">
    <nav class="nav-wrapper white center flow-text black-text "> <p class="fa">Favorite Photos</p> </nav></div>
    <div class="container">

    <div class="row" >
      
      <div class="col s4 m4 l4 "  id='1'>
        <div class="card   hoverable" v-for="x in test1" :key="x.id">
          <div class="card-image ">
            <img class=""  alt='MYimage'  :src="x.foto"  v-on:click="toLook(x.id)" >
          </div>
        </div>
      </div>


      <div class="col s4 m4 l4 "  >
        <div class="card   hoverable" v-for="x in test2" :key="x.id">
          <div class="card-image ">
            <img class=" " alt='MYimage'  :src="x.foto" v-on:click="toLook(x.id)">
          </div>
        </div>
      </div>
      
      <div class="col s4 m4 l4 "  id='3'>
        <div class="card   hoverable" v-for="x in test3" :key="x.id">
          <div class="card-image ">
            <img class="" alt='MYimage'  :src="x.foto" v-on:click="toLook(x.id)">
          </div>
   

        </div>
      </div>



</div>




         <div class="fixed-action-btn ">
            <router-link to="/"  class="btn-floating waves-effect waves-light btn-large hoverable blue">
                <i class="large  material-icons">keyboard_backspace</i>
            </router-link>
        </div>
    </div>

</template>

<script>
import db from '../firebase.js'
import { ref, onMounted, watch,onCreated ,computed} from 'vue';

export default {
setup(){
      const datefromfb = ref([]);
      let name =ref('');
      let des =ref('');
      let date=ref('');
      let foto=ref('')
        db.collection('fav').get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let smoothie = doc.data()
                  smoothie.id = doc.id
                  datefromfb.value.push(smoothie)
                })
              });

      let r = ref();
      r.value =datefromfb.value.length

    let tomodal=(c)=>{
      des.value=c[1]
      date.value=c[2]
      foto.value=c[3]
    }


      const test1 = computed(()=>{
        let r  =datefromfb.value.length
        let x = datefromfb.value.slice(0,r/3);
       return  x

      })
      let test2 = computed(()=>{
        let r =datefromfb.value.length
        let x = datefromfb.value.slice(r/3,2*r/3)
       return  x   
      })
      let test3 = computed(()=>{
        let r =datefromfb.value.length
        let x = datefromfb.value.slice(2*r/3,r)
       return  x   
      })
       return {datefromfb,test1,test2,r,test3,tomodal,name,date,des,foto}
  },
    methods:{
    toLook(c){
        this.$router.push({ name : 'lookatfavs', params: { id: c } })
     }
  },
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
.card{ margin: .1rem 0 0.2rem 0;}
@media screen and (max-width: 767px) {
  .container{
    width: 100%;
  }
}
</style>