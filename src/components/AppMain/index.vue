<template>
  <div class="main">
    <app-link/>
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from './Link.vue'
export default {
    components: {AppLink}
};
</script>

<style scoped>
</style>