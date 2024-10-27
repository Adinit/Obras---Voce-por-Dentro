<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <div class="main-view">
    <RouterView  />
  </div>
  <Footer />
</template>

<style scoped>
.main-view {
  grid-column-start: 1;
  grid-column-end: 3;
  padding-top: 120px;
}

.br-footer {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
