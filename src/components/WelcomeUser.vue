<template>
    <section class="welcome-block">
        <h1 class="welcome-block_title">Welcome to your "Logger" web-application!</h1>
        <ul class="welcome-block_list">
            On this web-application, you will be able to:
            <li>connect to your existing account</li>
            <li>register a new account</li>
            <li>display your account data</li>
            <li>edit your account data</li>
            <li>delete your account data</li>
            To continue toward your goal, you can first click on login/register link, available in the menu!
        </ul>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .welcome-block_title{
        text-align: center;
    }

    .welcome-block_list{
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }

    @media (max-width:750px){
        .welcome-block_list{
            width: 100%;
        } 
    }

    .welcome-block_list li{
        margin-left: 20px;
    }

    .title{
        margin-bottom: 20px;
    }

</style>