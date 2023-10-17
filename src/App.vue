<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style>

</style>
<script>
import {provide,inject } from 'vue'
export default {
  setup(){
    const dummy=inject('dummy')
    return {dummy }
  }
}
</script>