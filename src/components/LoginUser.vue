<template>
  <section class="login-bloc">
    <form @submit.prevent="submitLoginForm">
        <div class="input-wrapper">
            <label for="user-name">First Name</label>
            <input type="text" id="user-name" autocomplete="off" v-model="userToConnect.userName" @change="display">
        </div>
        <div class="input-wrapper">
            <label for="password">First Name</label>
            <input type="text" id="password" autocomplete="off" v-model="userToConnect.password" @change="display">
        </div>
        <button type="submit">Se Connecter</button>
    </form>
    <!--<button @click="localStorageCheck">check le token</button>-->
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";
import {accountServices} from "./services"
import { useTokenStore } from '@/stores/tokenStore'

const tokenStore = useTokenStore()


interface UserToConnect {
  userName: string;
  password: string;
};

const userToConnect = reactive<UserToConnect> ({
  userName: "",
  password: "",
});

const display = () => {
  console.log(userToConnect.userName, userToConnect.password);
}

/*const localStorageCheck = ()=>{
  console.log("localToken",localStorage.getItem("token"));
  console.log("token store",tokenStore.token)
}*/


const submitLoginForm = async () => {
  try {const response = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/login',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    },
    data: userToConnect
  });
  console.log("response",response);
  await accountServices.saveToken(response.data.token);
  const setTokenState = async ()=> {
    const tokenToSet = localStorage.getItem("token");;
    if(tokenToSet){
      await tokenStore.setToken(tokenToSet);
      console.log("token state",tokenStore.token.length);
      const la = "";
      console.log("lalength",la.length)
    }else{
      console.error("token introuvable dans le localStorage");
    }
  }
  await setTokenState();

}
  catch(error){
    console.log("erreur", error)
  };
}

</script>

<style>

</style>