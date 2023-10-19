
<template >

   <!-- no todos  -->

   <div v-if="getterTodos===0" class="flexflex-col mr-auto ml-auto  justify-center px-1 py-3 my-9 border rounded-lg w-96 h-30 0 ">
    <p class="flex justify-center py-6">No Pending tasks</p>
   </div >

   <!-- todos -->
 

  <div v-else  v-for="todos in storeAlltodos" :key="todos.id"  class="flex flex-row  ml-auto space-x-10  mr-auto justify-center px-3 py-1 "> 

   <div  class="active flex-col border  border-1 w-96 h-14 rounded shadow shadow-sm flex w-2/5 ">
       <div  v-if="todos.isCompleted">{{ todos.todo }}</div> 
   </div>
   <div   class="completed flex-col border border-1 w-96 h-14 shadow shadow-sm rounded " > 
      <div v-if="!todos.isCompleted">{{ todos.todo }}</div>
   </div>
    <!-- <div v-for="todos in storeAlltodos" :key="todos.id" class="flex border border-1 py-1 my-3 px-4 rounded-lg shadow shadow-sm" :class="{'bg-slate-300 shadow shadow-sm':todos.isCompleted}">
    <div class="text text-xl w-2/5">{{ todos.todo }}</div>
    <label class="p-3 w-2/5" v-if="todos.isCompleted">completed</label>
    <label v-else class="p-3 w-2/5"> due date : {{ todos.duedate}}</label>
    <div   class=" mr-20 ml-4 w-5 ml-auto ">
      
      <svg v-if="todos.isCompleted"  @click="deleteTodo(todos.id)" width="28px"  height="44px" viewBox="0 -0.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg>
     
    </div>
    <v-switch label="" v-model="todos.isCompleted" v-on:change="onChecked(todos)" inset></v-switch>

    <label class="p-4" v-if="!todos.isCompleted">Mark as completed</label>
</div> -->
  </div>

</template>

<script setup >
import { ref,onMounted, computed} from 'vue';
import {useStore} from 'vuex'
import {onCheck,deleteTodos,getAllTodos } from "../services/todoHelpers"



     const store =useStore()
     const storeAlltodos=computed(()=> store.state.todos)
     const getterTodos=computed(()=>{
      return store.getters.pendingList
    })
    const todosCount=ref(getterTodos.value)
     const onChecked=async(todos)=>{
      try{
         const res=await onCheck(todos)
         if(res.statusText==='OK'){
            store.dispatch('changeStatus',{ 
            id:todos.id,
            todo:todos.todo,
            duedate:todos.duedate,
            isCompleted:todos.isCompleted})
         }
      }catch(err){
         console.log(err,'error at change status ')
      }
      
     }

     const deleteTodo=async(id)=>{
      try{
        const res= await deleteTodos(id)
         if(res.statusText==='OK'){
               store.dispatch('deleteTodo',id)
            }
        }catch(error){
         console.log(error,'delete error')
      }
     }

     onMounted( async()=>{
      try{
         const res= await getAllTodos()
       if(res.statusText==="OK"){
        const todos=await res.data;
        store.dispatch('getAllTodos',todos)
       }
      }catch(err){
         console.log(err,'mounted error')
      }
       
    })
</script>

<style>

</style>