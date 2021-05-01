<template>


<router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
</router-view>

  <div style="border-bottom:2px solid white;margin-top:10px" class="test navbar-fixed  white">
   <nav class="nav-wrapper white flex3 " style="border-top-left-radius: 15px;border-top-right-radius: 15px;">
     <ul class="flex3">
            <li><router-link to="/" id='test' class=" z-depth-0 btn-floating white "><i class="material-icons white" style="color:#2196f3">home</i></router-link></li>
            <li><router-link :to="{name:'search'}" class=" z-depth-0 btn-floating white"><i style="color:#2196f3" class="material-icons ">search</i></router-link></li>
            <li><router-link to='/favorite'  class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">favorite</i></router-link></li>
            <li><router-link to="/makefotos" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">add_a_photo</i></router-link></li>
            <li><router-link to="/about" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">person</i></router-link></li>

        </ul>
   </nav>
  </div> 

</template>

<script>

export default {
   

}
</script>

<style scoped>
.test{
  bottom: 0;
  position: fixed;
  width: 100%;
    overflow: hidden;

}
#test:focus{
color:red;
}  
.activeLink2{
  color:red
}
.activeLink{
  color: red;
}
.flex2{
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}
.flex3{
  display: flex;
  justify-content: space-around;
}
.color{
  color: #2196f3;
}
.router-link-active {
  color: red;
}
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out; 
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in; 
}
</style>