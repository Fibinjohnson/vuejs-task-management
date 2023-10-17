<template>
  <div  class="flexflex-col w-4/5 ml-auto mr-auto justify-center px-3 py-1">
     <div v-for="todos in allTodos" :key="todos.id" class="flex   border border-2 py-1 px-4">
    <div class="text text-xl w-2/5">{{ todos.todo }}</div>
    <!-- <div class="ml-4 py-2 w-2/5">due date : {{ todos.duedate}}</div> -->
    <label class="p-3 w-2/5" v-if="todos.isCompleted">completed</label>
    <label v-else class="p-3 w-2/5"> due date : {{ todos.duedate}}</label>
    
    <input v-if="!todos.isCompleted" class="px-3  ml-4 w-5 ml-auto h-4accent-[#50d71e] " v-model="todos.isCompleted" v-on:change="onChecked(todos)" type="checkbox"  name="" id="">
    <svg   v-else @click="deleteTodo(todos.id)" width="28px"    height="84px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg>

    <label class="p-4" v-if="!todos.isCompleted">Mark as completed</label>
    
</div>


  </div>
</template>

<script>
import { ref ,onMounted, onUpdated,defineEmits,watchEffect,provide} from 'vue';
export default {
 
setup(props,context){
     
     const allTodos=ref(null)

     const onChecked=async(todos)=>{
         const res=await fetch(`http://localhost:3000/todos/${todos.id}`,{
            method:'put',
            headers:{
               "content-type":"application/json"
            },
            body:JSON.stringify({
               id:todos.id,
               todo:todos.todo,
               duedate:todos.duedate,
               isCompleted:todos.isCompleted

            })

         })
     }
     const deleteTodo=async(id)=>{
         const res=await fetch(`http://localhost:3000/todos/${id}`,{
            method:'delete'
         })
     }
     onMounted( async()=>{
        const res=await fetch('http://localhost:3000/todos',{
            method:'get'
        })
     if(res.ok){
        const todos=await res.json();
        allTodos.value=todos
        
     }else{
        console.log(res,'err')
     }
    })
    onUpdated(()=>{
      
    })
    watchEffect(()=>{
       context.emit('todoList',allTodos,deleteTodo)
    })
   
    return {allTodos,onChecked}
}
}
</script>

<style>

</style>