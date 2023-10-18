<template>
    <span class="error">
        <slot :errorComponent="errorComponent"></slot>
    </span>
</template>

<script setup lang="ts">
    import { computed } from "vue";

    const props = defineProps({
        statusCode: {
            type: Number
        },
        statusMessage: {
            type: String
        }
    });
    

    const errorComponent = computed(()=>{
        return `erreur ${props.statusCode}: ${props.statusMessage}`;
    });


</script>

<style scoped>
    .error{
        color:red;
    }
</style>