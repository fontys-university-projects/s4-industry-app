<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
<template>
  <Header class="z-10" />
    <RouterView class="z-1"/>
    <Footer class="z-10" />
</template>
