<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

    <!--<div class="wrapper">-->
      <!--<HelloWorld msg="Welcome friend!" />-->

    <nav class="wrapper">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/loginregister" class="nav-link">Login / Register</RouterLink>
      <RouterLink to="/displaydata" class="nav-link">Display Data</RouterLink>
    </nav>
    <!--</div>-->
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 50px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.nav-link{
  font-size: 20px;
  margin-right: 10px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
