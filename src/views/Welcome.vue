<template>
<div class=" ">
  <div class="welcome container">
    <div v-if="showLogin" class="test"> 
      <h2>Login</h2>
      <div>
      <form @submit.prevent="handleSubmit">
        <input class="welcome" type="email" required placeholder="email" v-model="email">
        <input class="welcome" type="password" required placeholder="password" v-model="password">
        <div class="error">{{ error }}</div>
        <button class="btn blue buttonTest">Log in</button>
        </form>
        </div><!--login-->
      <p>No account yet? <span @click="showLogin = false">Signup</span> instead.</p>
    </div>
    <div v-else class="test">
      <h2>Sign up</h2>
      <div>
        <form @submit.prevent="handleSubmit1">
            <input class="welcome" type="text" required placeholder="display name" v-model="displayName">
            <input class="welcome" type="email" required placeholder="email" v-model="email1">
            <input class="welcome" type="password" required placeholder="password" v-model="password1">
            <div class="error">{{ error1 }}</div>
            <button class="btn blue buttonTest">Sign up</button>
        </form>
    </div><!--signup-->
      <p>Already registered? <span @click="showLogin = true">Login</span> instead.</p>
    </div>
  </div>
  </div>
</template>

<script>
import useSignup from '../composables/useSignup'
import useLogin from '../composables/useLogin'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup(props,context) {
    const showLogin = ref(true)
    const email1 = ref('')
    const displayName = ref('')
    const password1 = ref('')
    let router = useRouter()
    const email = ref('')
    const password = ref('')
    const { error, login } = useLogin()
    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
        //context.emit('login')
        console.log('siccess login')
        router.push({name:'Home'})

      }
    }
    const { error1, signup } = useSignup()
    const handleSubmit1 = async () => {
      await signup(email1.value, password1.value, displayName.value)
      if (!error1.value) {
        //context.emit('signup')
        console.log('succsess')
        router.push({name:'Home'})

      }      
    }
    return { showLogin ,handleSubmit,email1,email,password1,password,displayName,handleSubmit1,error,error1}
  }
}
</script>

<style scoped>
.border{
    border-radius: 15px;
}
  .welcome {
    text-align: center;
    padding: 20px 0;
  }
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome  {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome  {
    width: 100%;
    padding: 10px;
    outline: none;
    color: #999;
    margin: 40% auto;
  }
  .welcome span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  .welcome button {
    margin: 20px auto;
  }
  .error{
    color: red;
  }
.buttonTest{border-radius: 10px; }
input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=email]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {

     border-radius: 15px; 
  
} 
.grid{
  top: 50%;
  display: flex;
  justify-items: center;
  align-items: center;
}
</style>