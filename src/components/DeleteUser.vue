<template>
  <section class="delete-bloc">
    <div>
      <p>Are you sure you really want to delete your account?</p>
      <button @click="submitDeleteRequest">Yes, I want to delete my account</button>
      <button @click="goBackToAccount">No, I don't want to delete my account</button>
    </div>
  </section>
</template>

<script setup lang="ts">
//import { reactive } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
import { useTokenStore } from '@/stores/tokenStore';


const tokenStore = useTokenStore();
const router = useRouter();
const tokenToSet = localStorage.getItem("token")


if (tokenToSet){
  tokenStore.loadToken();
}

if (tokenStore.token === "") {
  router.push('/loginregister');
}

const goBackToAccount = ()=>{
  console.log(`Bearer ${tokenStore.token}`);
  router.push('/displaydata');
}

const submitDeleteRequest = async () => {
  const response = await axios({
    method: 'post',
    url: `http://localhost:3000/api/deleteUser/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenStore.token}`
    },
  });
  console.log(response.data);
}


</script>

<style>

</style>