<template>
 <div class="navbar-fixed">
  <nav class="nav-wrapper  white center flow-text black-text "> <p class="fa">PhotoDiary</p> </nav></div>
  <div class="container">


      <!--<div id="modal1" class="modal">
    <div class="modal-content">
      <h4>{{name}}</h4>
      <p>{{des}}</p>
      <img :src="foto" class="responsive-img" alt="image">
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>

            <img class=" modal-trigger" href="#modal1" alt='MYimage'  :src="`data:image/png;base64,${x.foto}`"  v-on:click="toLook(x.id)" >

    @click="tomodal([x.name,x.describtion,x.date,`data:image/png;base64,${x.foto}`])"
  </div>-->

      <div class="row" >
      
<!--v-on:click="toLook(x.id)"-->
      <div class="col s4 m4 l4 "  id='1'>
        <div class="card   hoverable" v-for="x in test1" :key="x.id">
          <div class="card-image ">
            <img class=""  alt='MYimage'  :src="`data:image/png;base64,${x.foto}`"  v-on:click="toLook(x.id)" >
          </div>
        </div>
      </div>


      <div class="col s4 m4 l4 "  >
        <div class="card   hoverable" v-for="x in test2" :key="x.id">
          <div class="card-image ">
            <img class=" " alt='MYimage'  :src="`data:image/png;base64,${x.foto}`" v-on:click="toLook(x.id)">
          </div>
          

        </div>
      </div>
      
      <div class="col s4 m4 l4 "  id='3'>
        <div class="card   hoverable" v-for="x in test3" :key="x.id">
          <div class="card-image ">
            <img class="" alt='MYimage'  :src="`data:image/png;base64,${x.foto}`" v-on:click="toLook(x.id)">
          </div>
   

        </div>
      </div>



</div>
</div>

    <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue">
            <i class="large blue material-icons">menu</i>
        </a>
        <ul>
            <li><router-link to="/about" class="btn-floating blue"><i class="material-icons">person</i></router-link></li>
            <li><router-link to='/favorite' class="btn-floating red"><i class="material-icons">favorite</i></router-link></li>
            <li><router-link to="/makefotos" class="btn-floating yellow darken-1"><i class="material-icons">add_a_photo</i></router-link></li>
        </ul>
    </div>
      

</template>

<script>
import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
Capacitor, FilesystemDirectory } from "@capacitor/core";
import { ref, onMounted, watch,onCreated ,computed} from 'vue';
import { isPlatform } from '@ionic/vue';
import M from 'materialize-css'
import db from '../firebase.js'

export default {
  setup(){
      const datefromfb = ref([]);
      let name =ref('');
      let des =ref('');
      let date=ref('');
      let foto=ref('')
        db.collection('collectofcalclus').get()
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
        this.$router.push({ name : 'look', params: { info: c } })
     }
  },
  mounted(){



  
/*db.collection('collectofcalclus').add({
                question: 'ss',
                answer:'ss'
            }).catch(err =>{
                console.log(err)
            })*/

    
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);

      /* $(document).ready(function(){
          $('.materialboxed').materialbox();
        });*/
      
          $('.fixed-action-btn').floatingActionButton({
            toolbarEnabled: false,
            direction:'up',
            hoverEnabled:false
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
