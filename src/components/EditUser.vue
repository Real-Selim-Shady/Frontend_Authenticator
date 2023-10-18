<template>
  <section class="edit-block">
    <error-status :statusCode="responseStatus" :statusMessage="errorMessage" v-if="statusStore.errorEdit === true">
        <template #default="slotProps">
            {{ slotProps.errorComponent }}
        </template>
    </error-status>
    <form class="edit-block_form" @submit.prevent="submitEditForm">
        <div class="input-wrapper">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" autocomplete="off" v-model="userToEdit.firstName">
        </div>
        <div class="input-wrapper">
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" autocomplete="off" v-model="userToEdit.lastName">
        </div>
        <div class="input-wrapper">
            <label for="user-name">User Name</label>
            <input type="text" id="user-name" autocomplete="off" v-model="userToEdit.userName">
        </div>
        <div class="input-wrapper">
            <label for="password">Password</label>
            <input type="text" id="password" autocomplete="off" v-model="userToEdit.password">
        </div>
        <button type="submit">Edit</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/tokenStore";
import jwt_decode from "jwt-decode"; 
import { useUserStore } from "@/stores/userStore";
import { useStatusStore } from "@/stores/statusStore";
import ErrorStatus from "./ErrorStatus.vue";
import { editData } from "@/utils/api";


const tokenStore = useTokenStore();
const router = useRouter();
const tokenToSet = localStorage.getItem("token");
const userStore = useUserStore();
const statusStore = useStatusStore();



if (tokenToSet){
  tokenStore.loadToken();
}

if (tokenStore.token === "") {
  router.push("/loginregister");
}


interface UserToEdit {
  firstName: string,
  lastName: string,
  userName: string;
  password?: string;
}

const userToEdit=reactive<UserToEdit>({
  firstName: userStore.user.firstName,
  lastName: userStore.user.lastName,
  userName: userStore.user.userName,
  password: ""
});

const getUserIdFromToken = (token: string) => {
  try {
    const decodedToken: { userId: string } = jwt_decode(token);
    return decodedToken.userId;
  } catch (error) {
    console.error("Erreur lors de la décodification du token :", error);
    return null;
  }
};

const userIdFromToken = getUserIdFromToken(tokenStore.token);

const updateUserStore = ()=>{
  userStore.user.firstName = userToEdit.firstName;
  userStore.user.lastName = userToEdit.lastName;
  userStore.user.userName = userToEdit.userName;
};

const failCallApi = (httpStatusCode: number, statusMessage: string)=>{
  statusStore.setErrorMessage(statusMessage);
  statusStore.setStatusCode(httpStatusCode);
  statusStore.setErrorLogin(false);
  statusStore.setErrorEdit(true);
  statusStore.setSuccessRegister(false);
};

const successCallApi = (responseNum: number)=>{

  statusStore.setStatusCode(responseNum);
  statusStore.setErrorLogin(false);
  statusStore.setErrorEdit(false);
  statusStore.setSuccessRegister(false);
};


const submitEditForm = async () => {
  try{
    const doNotEditPassword = async ()=>{
    if(userToEdit.password == ""){
      delete userToEdit.password;
    }
    };
    await doNotEditPassword();


    const response = await editData(userIdFromToken as string, tokenStore.token, userToEdit);

    const responseNum = response.status;
    userToEdit.password="";
    updateUserStore();
    successCallApi(responseNum);
    router.push("/displayData");
  }
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
  }

  input{
    border-radius: 11px;
    border: solid 2px black;
    padding-left: 8px;
    height: 28px;
    width: 200px;
    align-self: center;
  }
  .input-wrapper label {
    align-self: center;
  }

  .edit-block_form button {
    display: flex;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    width: 150px;
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

  .edit-block_form button::before, .login_button::after {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    transition: all .35s;
    z-index: -1;
    border-radius: 5px;
  }
  .edit-block_form button::before {
    left: 0;
    background: hsla(160, 100%, 37%, 1);
  }

  .edit-block_form button::after {
    right: 0;
    background: hsla(160, 100%, 37%, 1);
  }

  .edit-block_form button:hover::before {
    width: 100%;
  }

  .edit-block_form button:hover::after {
    width: 0%; 
  }

  .edit-block_form button:hover {
    color: #fff;
  }

  .edit-block_form button:active {
    background-color: rgb(162, 155, 155);
    transition-property: background-color; 
  }
  
</style>