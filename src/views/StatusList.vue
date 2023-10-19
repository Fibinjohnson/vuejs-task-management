<template>
  <div class="flex justify-between p-5 px-10 ">
    <div class="border rounded-lg w-96 h-20 shadow shadow-lg ">
        <p class=" flex justify-center items-center  mt-3  underline underline-offset-[3px] decoration-solid p-3">completed todos: {{ completed }}</p>
    </div>
    <div class="border rounded-lg w-96 h-20 shadow shadow-lg">
        <p class="flex justify-center mt-3  underline underline-offset-[3px] decoration-solid p-3">pending todos:{{ pending }}</p>
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
    const pending=computed(()=>{
        if(storeTodos.todos!==null){
            const pendingTodos= storeTodos.value.filter((todo)=>{return todo.isCompleted==false})
        return pendingTodos.length
        }
        return 0
    })
    const completed=computed(()=>{
        if(storeTodos.todos!==null){
            const pendingTodos= storeTodos.value.filter((todo)=>{return todo.isCompleted==true})
        return pendingTodos.length
        }
        return 0
       
    })
    



</script>

<style>

</style>