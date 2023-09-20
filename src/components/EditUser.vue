<template>
  <section class="edit-bloc">
    <form @submit.prevent="submitEditForm">
        <div class="input-wrapper">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" autocomplete="off" v-model="userToEdit.firstName">
        </div>
        <div class="input-wrapper">
            <label for="last-name">First Name</label>
            <input type="text" id="last-name" autocomplete="off" v-model="userToEdit.lastName">
        </div>
        <div class="input-wrapper">
            <label for="user-name">First Name</label>
            <input type="text" id="user-name" autocomplete="off" v-model="userToEdit.userName">
        </div>
        <div class="input-wrapper">
            <label for="password">First Name</label>
            <input type="text" id="password" autocomplete="off" v-model="userToEdit.password">
        </div>
        <button type="submit">S'inscrire</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
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


interface UserToEdit {
  firstName: string,
  lastName: string,
  userName: string;
  password: string;
}

const userToEdit=reactive<UserToEdit>({
  firstName: "",
  lastName: "",
  userName: "",
  password: ""
});

const submitEditForm = async () => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/editUser',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    },
    data: userToEdit
  });
  console.log(response.data);
}


</script>

<style>

</style>