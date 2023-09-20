<template>
  <section class="data-bloc">
    <button @click="getUserData"></button>
    <p>vos informations:</p>
    <p>{{ userToDisplay.firstName }}</p>
    <p>{{ userToDisplay.lastName }}</p>
    <p>{{ userToDisplay.userName }}</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
import { useTokenStore } from '@/stores/tokenStore';
import jwt_decode from "jwt-decode"; 


const tokenStore = useTokenStore();
const router = useRouter();
const tokenToSet = localStorage.getItem("token")

if (tokenToSet){
  tokenStore.loadToken();
}

if (tokenStore.token === "") {
  router.push('/loginregister');
}


const getUserIdFromToken = (token: string) => {
  try {
    const decodedToken: { userId: string } = jwt_decode(token);
    return decodedToken.userId;
  } catch (error) {
    console.error("Erreur lors de la décodification du token :", error);
    return null;
  }
}

const userIdFromToken = getUserIdFromToken(tokenStore.token);

interface UserToDisplay {
  firstName: string,
  lastName: string,
  userName: string;
}

const userToDisplay=reactive<UserToDisplay>({
  firstName: "",
  lastName: "",
  userName: "",
});


const getUserData = async () => {
  const response = await axios({
    method: 'get',
    url: `http://localhost:3000/api/findUser/${userIdFromToken}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenStore.token}`
    },
  });
  console.log("reponse.data",response.data);
  userToDisplay.firstName = response.data.data.firstName
  userToDisplay.lastName = response.data.data.lastName
  userToDisplay.userName = response.data.data.userName
}

onMounted(() => {
  getUserData();
});


</script>

<style>

</style>