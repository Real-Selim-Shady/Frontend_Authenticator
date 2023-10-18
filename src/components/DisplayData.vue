<template>
  <section class="display-data-block_buttons">
    <button class="display-data-block_logout-button" @click="logOut">Log Out</button>
    <button class="display-data-block_edit-button" @click="toggleEditAction">
      {{ !userStore.editAction ? "Edit data" : "Stop editing" }}
    </button>
    <button class="display-data-block_delete-button" @click="toggleDeleteAction">
      {{ !userStore.deleteAction ? "Delete account" : "Stop deleting" }}
    </button>
  </section>
  <section class="display-data-block_data">
    <h1>Welcome {{ userStore.user.userName }} ! Here are your data:</h1>
    <p>First Name: {{ userStore.user.firstName }}</p>
    <p>Last Name: {{ userStore.user.lastName }}</p>
    <p>Username: {{ userStore.user.userName }}</p>
  </section>
  <section v-if="userStore.editAction">
    <EditUser />
  </section>
  <section v-if="userStore.deleteAction">
    <DeleteUser />
  </section>

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/tokenStore";
import jwt_decode from "jwt-decode"; 
import { accountServices } from "@/utils/services";
import EditUser from "./EditUser.vue";
import DeleteUser from "./DeleteUser.vue";
import {useUserStore} from "@/stores/userStore";
import { retrieveData } from "@/utils/api";

const router = useRouter();
const tokenStore = useTokenStore();
const tokenToSet = localStorage.getItem("token");
const userStore = useUserStore();

//token features
  if (tokenToSet){
    tokenStore.loadToken();
  }

  if (tokenStore.token === "") {
    router.push("/loginregister");
  }

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
//end of token features

//activate edit feature / inactivate edit feature
const toggleEditAction = () => {
  userStore.setDeleteAction(false);
  userStore.setEditAction(!userStore.editAction);
};
//end of activate edit feature / inactivate edit feature

//activate delete feature / inactivate delete feature
const toggleDeleteAction = () => {
  userStore.setDeleteAction(!userStore.deleteAction);
  userStore.setEditAction(false);
};
//end of activate delete feature / inactivate delete feature

//log-out feature
  const logOut = async() =>  {
    await accountServices.logout();
    await tokenStore.removeToken();
    router.push("/loginregister");
  };
//end of log-out feature

//function retrieving user data
  const getUserData = async () => {
    try{
      const response = await retrieveData(userIdFromToken as string, tokenStore.token);
      console.log("reponse.data",response.data);
      const setUserData = async()=>{
        const { firstName, lastName, userName } = response.data.data;
        userStore.setUserAction({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
        });
      };
      await setUserData();
    }
    catch{
      router.push("/loginregister");
    }
  };
//end of function retrieving user data

//data init while component is mounted
  onMounted(async () => {
    await getUserData();
    userStore.setEditAction(false);
    userStore.setDeleteAction(false);
  });
//end of data init while component is mounted


</script>

<style scoped>
  .display-data-block_buttons{
    display: flex;
    flex-direction: row;
    width: 65%;
    align-self: center;
  }

  
  @media (max-width: 750px){
    .display-data-block_buttons{
      flex-direction: column;
      width: 100%;
    }
  }

  .display-data-block_data h1{
    margin-top: 30px;
    margin-bottom: 10px;
    text-align-last: center;
  }

  .display-data-block_data p{
    text-align: center;
  }
  .display-data-block_buttons button {
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
    color: rgba(5, 138, 239, 0.86);
  }

  .display-data-block_buttons button::before, .login_button::after {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    transition: all .35s;
    z-index: -1;
    border-radius: 5px;
  }
  .display-data-block_buttons button::before {
    left: 0;
    background: rgba(5, 138, 239, 0.86);
  }

  .display-data-block_buttons button::after {
    right: 0;
    background: rgba(5, 138, 239, 0.86);
  }

  .display-data-block_buttons button:hover::before {
    width: 100%;
  }

  .display-data-block_buttons button:hover::after {
    width: 0%; 
  }

  .display-data-block_buttons button:hover {
    color: #fff;
  }

  .display-data-block_buttons button:active {
    background-color: rgb(162, 155, 155);
    transition-property: background-color; 
  }

</style>