<template>
    <span class="error">
        <slot :successComponent="successComponent"></slot>
    </span>
</template>

<script setup lang="ts">
    import { computed } from "vue";

    const props = defineProps({
        statusMessage: {
            type: String
        }
    });
    

    const successComponent = computed(()=>{
        return `Success: ${props.statusMessage}`;
    });


</script>

<style scoped>
    .error{
        color: hsla(160, 100%, 37%, 1);
    }
</style>