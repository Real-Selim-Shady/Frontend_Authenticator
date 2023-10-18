<script setup lang="ts">
import LoginUserVue from "../components/LoginUser.vue";
import RegisterUserVue from "../components/RegisterUser.vue"
</script>

<template>
  <main class="login-and-register">
    <LoginUserVue class="login-block" />
    <RegisterUserVue class="register-block" />
  </main>
</template>

<style scoped>
  .login-and-register{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .login-block{
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  .register-block{
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  @media (max-width: 800px){
    .login-and-register{
      flex-direction: column;
      align-items: center;
    }
    .login-block{
      padding-right: 0px;
      padding-bottom: 20px;
    }

    .register-block{
      padding-left: 0px;
      padding-top: 20px;
    }
  }
</style>
