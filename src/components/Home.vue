<template>
  <div class="home-container rd-row-flex">
    <side-left></side-left>
    <posts></posts>
      <!-- <router-view/> -->
    <sidebar></sidebar>
  </div>
  
</template>

<script>
import sideLeft from "./common/sideLeft.vue";
import posts from "./common/posts.vue";
import sidebar from "./common/sidebar.vue";
import pageNav from "./common/pageNav.vue";
 
export default {
    name:'home',
    data() {
        return {};
    },
    components: {
        "side-left": sideLeft,
        posts: posts,
        sidebar: sidebar,
        pageNav:pageNav
    }
};
</script>

<style scoped>
.home-container {
    position: relative;
    width: 1120px;
    padding: 80px 0 30px;
    margin: 0 auto;
}
</style>
