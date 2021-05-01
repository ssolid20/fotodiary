
<template>
      <div style="border-bottom:2px solid white;margin-top:10px" class="test navbar-fixed  white">
   <nav class="nav-wrapper white flex3 " style="border-top-left-radius: 15px;border-top-right-radius: 15px;">
     <ul class="flex3">
            <li><router-link to="/" id='test' class=" z-depth-0 btn-floating white "><i class="material-icons white" style="color:#2196f3">home</i></router-link></li>
            <li><router-link :to="{name:'search'}" class=" z-depth-0 btn-floating white"><i style="color:#2196f3" class="material-icons ">search</i></router-link></li>
            <li><router-link to='/favorite' style="border: black;" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">favorite</i></router-link></li>
            <li><router-link to="/makefotos" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">add_a_photo</i></router-link></li>
            <li><router-link to="/about" class="btn-floating z-depth-0 white"><i style="color:#2196f3" class="material-icons ">person</i></router-link></li>

        </ul>
   </nav>
  </div> 
</template>