<template>
  <div v-if="user">
    <div>
      <p>Hey there {{ user.displayName }}</p>
      <p class="">Currently logged in as {{ user.email  }}</p>
    </div>
    <button @click="handleClick">Logout</button>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import useCollection from '../composables/useCollection'
import  firebase  from '../firebase'
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
export default {
  setup() {
    let router =useRouter()
    let {timestamp} =firebase
    const { logout, error } = useLogout()
    const { user } = getUser()
    const handleClick = async () => {
      await logout()
      console.log('logout')
      router.push({name:'welcome'})
    }

    
    const { addDoc, error1 } = useCollection(`${user.email}`)
    // refs
    const message = ref('')
    const handleSubmit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
      }
      await addDoc(chat)
      if (!error1.value) {
        message.value = ''
      }
    }

    



    return {user,handleClick,handleSubmit}
  }
}
</script>

<style>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>
