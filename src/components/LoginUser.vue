<template>
  <section class="login-bloc">
    <error-status :statusCode="responseStatus" :statusMessage="errorMessage" v-if="statusStore.errorLogin === true">
        <template #default="slotProps">
            {{ slotProps.errorComponent }}
        </template>
    </error-status>
    <h2>Connect to your account:</h2>
    <form @submit.prevent="submitLoginForm">
        <div class="input-wrapper">
            <label for="login_user-name">User Name</label>
            <input type="text" id="login_user-name" autocomplete="off" v-model="userToConnect.userName" @change="display">
        </div>
        <div class="input-wrapper">
            <label for="login_password">Password</label>
            <input type="password" id="login_password" autocomplete="off" v-model="userToConnect.password" @change="display">
        </div>
        <button type="submit" class="login-register_button">Connect</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { accountServices } from "@/utils/services";
import { useTokenStore } from "@/stores/tokenStore";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useStatusStore } from "@/stores/statusStore";
import ErrorStatus from "./ErrorStatus.vue";
import { connectUser } from "@/utils/api";

const tokenStore = useTokenStore();
const userStore = useUserStore();
const statusStore = useStatusStore();
const router = useRouter();

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
};

const failCallApi = (httpStatusCode: number, statusMessage: string)=>{
  statusStore.setErrorMessage(statusMessage);
  statusStore.setStatusCode(httpStatusCode);
  statusStore.setErrorLogin(true);
  statusStore.setErrorRegister(false);
  statusStore.setErrorEdit(false);
  statusStore.setSuccessRegister(false);
};

const successCallApi = ()=>{
  statusStore.setStatusCode(200);
  statusStore.setErrorLogin(false);
  statusStore.setErrorEdit(false);
  statusStore.setErrorRegister(false);
  statusStore.setSuccessRegister(false);
};


const submitLoginForm = async () => {
  try {
    const response = await connectUser(userToConnect);
    await accountServices.saveToken(response.data.token);
    const setTokenState = async ()=> {
      const tokenToSet = localStorage.getItem("token");;
      if(tokenToSet){
        await tokenStore.setToken(tokenToSet);
      }else{
        console.error("token introuvable dans le localStorage");
      }
    };
    await setTokenState();
    const setUserData = async()=>{
    const { firstName, lastName, userName } = response.data.data;
    userStore.setUserAction({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
    });
    };
    await setUserData();
    successCallApi();
    router.push("/displaydata");
  }
  catch(error:any){
    console.log("erreur", error.response.data.message);
    const statusMessage = error.response.data.message;
    const httpStatusCode = error.response.status;
    await failCallApi(httpStatusCode, statusMessage);
  };
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
    align-items: center;
  }

  input{
    border-radius: 11px;
    border: solid 2px black;
    padding-left: 8px;
    height: 28px;
    width: 200px;
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