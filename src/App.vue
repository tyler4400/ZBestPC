<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>
<script setup>
import {ref} from 'vue'
const message = ref('Hello Vue!')
</script>
<style></style>
