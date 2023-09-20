<template>
  <section class="register-bloc">
    <form @submit.prevent="submitRegisterForm">
        <div class="input-wrapper">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" autocomplete="off" v-model="userToRegister.firstName">
        </div>
        <div class="input-wrapper">
            <label for="last-name">First Name</label>
            <input type="text" id="last-name" autocomplete="off" v-model="userToRegister.lastName">
        </div>
        <div class="input-wrapper">
            <label for="user-name">First Name</label>
            <input type="text" id="user-name" autocomplete="off" v-model="userToRegister.userName">
        </div>
        <div class="input-wrapper">
            <label for="password">First Name</label>
            <input type="text" id="password" autocomplete="off" v-model="userToRegister.password">
        </div>
        <button type="submit">S'inscrire</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';


interface UserToRegister {
  firstName: string,
  lastName: string,
  userName: string;
  password: string;
}

const userToRegister=reactive<UserToRegister>({
  firstName: "",
  lastName: "",
  userName: "",
  password: ""
});

const submitRegisterForm = async () => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/registerUser',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    },
    data: userToRegister
  });
  console.log(response.data);
}


</script>

<style>

</style>