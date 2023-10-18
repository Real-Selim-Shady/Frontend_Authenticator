<template>
  <section class="delete-block">
    <p>Are you sure you really want to delete your account?</p>
    <div class="delete-block_buttons">
      <button class="delete-block_yes-button" @click="submitDeleteRequest">Yes, I want to delete my account</button>
      <button class="delete-block_no-button" @click="goBackToAccount">No, I don't want to delete my account</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/tokenStore";
import jwt_decode from "jwt-decode"; 
import { accountServices } from "@/utils/services";
import { useUserStore } from "@/stores/userStore";
import { deleteUser } from "@/utils/api";



const tokenStore = useTokenStore();
const router = useRouter();
const tokenToSet = localStorage.getItem("token");
const userStore = useUserStore();


if (tokenToSet){
  tokenStore.loadToken();
}

if (tokenStore.token === "") {
  router.push("/loginregister");
}

const goBackToAccount = ()=>{
  userStore.setDeleteAction(!userStore.deleteAction);
};

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

const submitDeleteRequest = async () => {
  try{  
    const response = await deleteUser(userIdFromToken as string, tokenStore.token);
    const responseNum = response.status;
    if(responseNum == 200){
    await accountServices.logout();
    await tokenStore.removeToken();
    router.push("/loginregister");
    }
    
  }catch{
    console.log("erreur");
  }
};



</script>

<style scoped>
  .delete-block{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;
  }

  .delete-block p{
    font-weight: 500;
  }

  .delete-block_buttons{
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 800px){
    .delete-block_buttons{
      flex-direction: column;
    }
  }

  .delete-block_yes-button {
    display: flex;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    width: 350px;
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
    color: rgb(210, 72, 72);
  }

  .delete-block_yes-button::before, .login_button::after {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    transition: all .35s;
    z-index: -1;
    border-radius: 5px;
  }
  .delete-block_yes-button::before {
    left: 0;
    background: rgb(210, 72, 72);
  }

  .delete-block_yes-button::after {
    right: 0;
    background: rgb(210, 72, 72);
  }

  .delete-block_yes-button:hover::before {
    width: 100%;
  }

  .delete-block_yes-button:hover::after {
    width: 0%; 
  }

  .delete-block_yes-button:hover {
    color: #fff;
  }

  .delete-block_yes-button:active {
    background-color: rgb(162, 155, 155);
    transition-property: background-color; 
  }

  .delete-block_no-button {
    display: flex;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    width: 350px;
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

  .delete-block_no-button::before, .login_button::after {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    transition: all .35s;
    z-index: -1;
    border-radius: 5px;
  }
  .delete-block_no-button::before {
    left: 0;
    background: hsla(160, 100%, 37%, 1);
  }

  .delete-block_no-button::after {
    right: 0;
    background: hsla(160, 100%, 37%, 1);
  }

  .delete-block_no-button:hover::before {
    width: 100%;
  }

  .delete-block_no-button:hover::after {
    width: 0%; 
  }

  .delete-block_no-button:hover {
    color: #fff;
  }

  .delete-block_no-button:active {
    background-color: rgb(162, 155, 155);
    transition-property: background-color; 
  }


</style>