<template>
 
  <nav class="nav-wrapper white center flow-text black-text "> <p class="fa">PhotoDiary</p> </nav>
  <div class="container">

      <div class="row">
      <div class="col s12 m6 l4">
        <div class="card hoverable">
          <div class="card-image">
            <img alt='image' class="materialboxed" src="../assets/test1.jpg">
            
          </div>
          <div class="card-content center activator">
            <span class="activator center">Name of photo</span>
          </div>
        <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Description of Photo<i class="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam corrupti aspernatur, ut dignissimos pariatur nulla quibusdam consequatur cupiditate ab quidem sed cumque fuga nostrum totam perferendis quaerat porro, facere id!</p>
        </div>
          <div class="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>

      <div class="col s12 m6 l4">
        <div class="card hoverable">
          <div class="card-image">
            <img alt='image' class="materialboxed" src="../assets/test2.jpg">
            <span class="card-title">Card Title</span>
          </div>
          <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
          </div>
          <div class="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    </div>


  </div>


    <!--<div class="container">
      <div class="fixed-action-btn ">
        <router-link to="/makefotos"  class="btn-floating waves-effect waves-light btn-large hoverable blue">
          <i class="large  material-icons">add</i>
        </router-link>
      </div>
    </div>-->
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue">
            <i class="large blue material-icons">menu</i>
        </a>
        <ul>
            <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
            <li><router-link to='/favorite' class="btn-floating red"><i class="material-icons">favorite</i></router-link></li>
            <li><router-link to="/about" class="btn-floating blue"><i class="material-icons">person</i></router-link></li>
            <li><router-link to="/makefotos" class="btn-floating yellow darken-1"><i class="material-icons">add_a_photo</i></router-link></li>
        </ul>
    </div>
      

</template>

<script>
export default {
  setup(){
     
  },
  mounted(){
       $(document).ready(function(){
          $('.materialboxed').materialbox();
        });
      
          $('.fixed-action-btn').floatingActionButton({
            toolbarEnabled: false,
            direction:'up',
            hoverEnabled:false
          });
       
  }
}
</script>

<style>
.fa{
font-family: 'Hammersmith One', sans-serif;
}
.x{
  color: black;
}
</style>
