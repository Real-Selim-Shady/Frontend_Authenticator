<template>
  <section class="register-bloc">
    <error-status :statusCode="responseStatus" :statusMessage="errorMessage" v-if="statusStore.errorRegister === true">
        <template #default="slotProps">
            {{ slotProps.errorComponent }}
        </template>
    </error-status>
    <success-status :statusMessage="statusStore.successMessage" v-if="statusStore.successRegister === true">
        <template #default="slotProps">
            {{ slotProps.successComponent }}
        </template>
    </success-status>
    <h2>Register a new account:</h2>
    <form @submit.prevent="submitRegisterForm">
        <div class="input-wrapper">
            <label for="register_first-name">First Name</label>
            <input type="text" id="register_first-name" autocomplete="off" v-model="userToRegister.firstName">
        </div>
        <div class="input-wrapper">
            <label for="register_last-name">Last Name</label>
            <input type="text" id="register_last-name" autocomplete="off" v-model="userToRegister.lastName">
        </div>
        <div class="input-wrapper">
            <label for="register_user-name">User Name</label>
            <input type="text" id="register_user-name" autocomplete="off" v-model="userToRegister.userName">
        </div>
        <div class="input-wrapper">
            <label for="register_password">Password</label>
            <input type="password" id="register_password" autocomplete="off" v-model="userToRegister.password">
        </div>
        <button type="submit" class="login-register_button">Register</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useStatusStore } from "@/stores/statusStore";
import ErrorStatus from "./ErrorStatus.vue";
import SuccessStatus from "./SuccessStatus.vue";
import { registerUser } from "@/utils/api";

const statusStore = useStatusStore();


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

const failCallApi = (httpStatusCode: number, statusMessage: string)=>{
  statusStore.setErrorMessage(statusMessage);
  statusStore.setStatusCode(httpStatusCode);
  statusStore.setErrorLogin(false);
  statusStore.setErrorEdit(false);
  statusStore.setErrorRegister(true);
};

const successCallApi = (responseNum: number, responseMessage: string)=>{

  statusStore.setStatusCode(responseNum);
  statusStore.setErrorLogin(false);
  statusStore.setErrorEdit(false);
  statusStore.setErrorRegister(false);
  statusStore.setSuccessMessage(responseMessage);
  statusStore.setSuccessRegister(true);
};

const submitRegisterForm = async () => {
  try{
  const response = await registerUser(userToRegister);
  const responseNum = response.status;
  const responseMessage = response.data.message;
  console.log("success", response.data.message);
  successCallApi(responseNum, responseMessage);}
  catch(error:any){
    console.log("erreur", error.response.data.message);
    const statusMessage = error.response.data.message;
    const httpStatusCode = error.response.status;
    await failCallApi(httpStatusCode, statusMessage);
  }
};

const errorMessage = ref(statusStore.errorMessage);
const responseStatus = ref(statusStore.statusCode);
watch(() => statusStore.statusCode, (newValue) => {
  responseStatus.value = newValue;
});
watch(() => statusStore.errorMessage, (newValue) => {
  errorMessage.value = newValue;
});


</script>

<style scoped>
  .input-wrapper{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 200px;
    align-items: center;
  }

  input{
    border-radius: 11px;
    border: solid 2px black;
    padding-left: 8px;
    height: 28px;
  }

  .login-register_button {
    display: flex;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    width: 100px;
    height: 30px;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI','Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
    font-weight: 500;
    transition: all .35s;
    background: white;
    border-color: transparent;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: hsla(160, 100%, 37%, 1);
  }

  .login-register_button::before, .login_button::after {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    transition: all .35s;
    z-index: -1;
    border-radius: 5px;
  }
  .login-register_button::before {
    left: 0;
    background: hsla(160, 100%, 37%, 1);
  }

  .login-register_button::after {
    right: 0;
    background: hsla(160, 100%, 37%, 1);
  }

  .login-register_button:hover::before {
    width: 100%;
  }

  .login-register_button:hover::after {
    width: 0%; 
  }

  .login-register_button:hover {
    color: #fff;
  }

  .login-register_button:active {
    background-color: rgb(162, 155, 155);
    transition-property: background-color; 
  }



</style>