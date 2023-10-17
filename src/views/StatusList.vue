<template>
  <div class="flex justify-between p-5 px-10 ">
    <div class="border rounded-lg w-96 h-20 ">
        <p class=" flex justify-center items-center  mt-3  underline underline-offset-[3px] decoration-solid p-3">completed todos: {{ completed }}</p>
    </div>
    <div class="border rounded-lg w-96 h-20">
        <p class="flex justify-center mt-3  underline underline-offset-[3px] decoration-solid p-3">pending todos:{{ pending }}</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
export default {
props:['todos'],
setup(props){

    const pending=computed(()=>{
        if(props.todos!==null){
            const pendingTodos= props.todos.filter((todo)=>{return todo.isCompleted==false})
        return pendingTodos.length
        }
        return 0
       
    })
    const completed=computed(()=>{
        if(props.todos!==null){
            const pendingTodos= props.todos.filter((todo)=>{return todo.isCompleted==true})
        return pendingTodos.length
        }
        return 0
       
    })
    
return {pending,completed}
}
}
</script>

<style>

</style>