<template>
  <div class="flex justify-between p-5 px-10 ">
    <div class="border rounded-lg w-96 h-20 shadow shadow-lg">
        <p class=" flex justify-center items-center  mt-3  underline underline-offset-[3px] decoration-solid p-3">completed todos: {{ completed }}</p>
    </div>
    <div class="border rounded-lg w-96 h-20 shadow shadow-lg">
        <p class="flex justify-center mt-3  underline underline-offset-[3px] decoration-solid p-3">Active todos:{{ active }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {useStore} from 'vuex'


    const store=useStore()
    const storeTodos= computed(()=>{
      return store.state.todos
    })
    const active=computed(()=>{
     
          return store.getters['active/activeCount']
        
       
    })
    const completed=computed(()=>{
       
           return store.getters['completed/completedCount']
        
       
    })
    



</script>

<style>

</style>