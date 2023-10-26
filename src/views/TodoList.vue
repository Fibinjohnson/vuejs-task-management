
<template >
   <div v-if="getterTodos===0" class="flexflex-col mr-auto ml-auto  justify-center px-1 py-3 my-9 border rounded-lg w-96 h-30 0 ">
    <p class="flex justify-center py-6">No  tasks</p>
   </div >


 <div  v-else class="flex justify-between ml-auto space-x-10 mr-auto px-3 py-1">
  <div  class="flex flex-col h-18">
    <div v-if="completedTodosCount===0" class=" flex justify-center  align-center p-48 pr-96" ><p class="subpixel-antialiased font-bold hover:antialiased"> No Completed Todos</p></div>
    <div v-for="todos in completedTodos" :key="todos.id" class="parent ml-auto space-x-10 ml-auto px-3 py-1">
      <div class="flex flex-row">
        <div v-if="todos.isCompleted" class="active justify-between bg-slate-300 shadow shadow-sm  flex flex-row border border-1 w-full h-14 rounded shadow shadow-sm">
           <div class="w-52 p-3">{{ todos.todo }} </div>
           <label class=" p-3 w-46 " ><b>Completed</b></label>
           <v-switch class="" label="Mark as active" v-model="todos.isCompleted" v-on:change="onCheckedCompleted(todos)" inset></v-switch>
           <div  class=" w-54 pl-4 flex justify-end  mr-4">
          <svg class="" @click="deleteTodo(todos.id)" width="26px"  height="46px" viewBox="0 -0.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg>
         </div>
        </div>
      </div>
    </div>
  </div>

 

  <div  class="flex flex-col ">
    <div class="justify-center align-center p-48 pr-96"   v-if="activeTodosCount===0"><p class="subpixel-antialiased  hover:antialiased font-bold">No active todos</p></div>
   <div v-for="todos in activeTodos" :key="todos.id" class="parent ml-auto space-x-10 mr-auto px-3 py-1">
      <div class="flex flex-row">
        <div v-if="!todos.isCompleted" class="active  flex flex-row border border-1 h-14 rounded shadow shadow-sm w-full">
          <div class="w-52 p-3">{{ todos.todo }}</div>
          <label class="p-3 w-96 ">Due date: {{ todos.duedate }}</label>
          <div class="p-3 pl-6 mr-6" @click="editTodo(todos.id)">
            <svg width="25px" height="25px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit [#1479]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"> </path> </g> </g> </g> </g></svg>
          </div>
          <EditModal :todos="modalValue" @close-modal="closeModal" :dialog="dialog"/>
          <v-switch label="Mark as completed" class=" mr-12 pl-4" v-model="todos.isCompleted" v-on:change="onCheckedActive(todos)" inset></v-switch>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup >

import { ref,onMounted, computed,reactive, onUpdated} from 'vue';
import {useStore} from 'vuex'
import {onCheck,deleteTodos,getAllTodos } from "../services/todoHelpers"
import EditModal from './EditModal.vue'


     const store =useStore()
     const activeTodos=computed(()=>store.state['active'].activeTodos)
     const completedTodos=computed(()=>store.state['completed'].completedTodos)
     const modalValue=ref([])
 
   
     const getterTodos=computed(()=>{
      return store.getters.todoCount
    })
    const todosCount=ref(getterTodos.value)
    const dialog=ref(false)
    const activeTodosCount=computed(()=>{
      return store.getters.activeTodos
    })
    const completedTodosCount=computed(()=>{
      return store.getters.completedTodos
    })
     const onCheckedActive=async(todos)=>{
      try{
         const res=await onCheck(todos)
         if(res.statusText==='OK'){
            store.dispatch('active/removeItem',todos.id)

            store.dispatch('completed/changeStatus',{ 
            id:todos.id,
            todo:todos.todo,
            duedate:todos.duedate,
            isCompleted:todos.isCompleted})
         
         }
      }catch(err){
         console.log(err,'error at change status ')
      }
     }
     const onCheckedCompleted=async(todos)=>{
      try{
         const res=await onCheck(todos)
         if(res.statusText==='OK'){
          
            store.dispatch('completed/removeItem',todos.id)

            store.dispatch('active/changeStatus',{ 
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
               store.dispatch('completed/deleteTodo',id)
            }
        }catch(error){
         console.log(error,'delete error')
      }
     }


   const closeModal=()=>{
      dialog.value=false
   }

   const editTodo=(id)=>{
      dialog.value=true
   
      modalValue.value= {...store.getters['active/editModal'](id)[0]}
      const inputDateString = modalValue.value.duedate;
      const [datePart, timePart] = inputDateString.split(', ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes, seconds] = timePart.split(':');
      const newDate = new Date(`${month} ${day} ${year} ${hours}:${minutes}:${seconds}`);
      const formattedDate = newDate.toString();
      modalValue.value.duedate=formattedDate
   }

     onMounted( async()=>{
      try{
         const res= await getAllTodos()
       if(res.statusText==="OK"){
        const todos=await res.data;
        const activeList=todos.filter((todo)=>{
          return todo.isCompleted===false
        })
        const completedList=todos.filter((todo)=>{
          return todo.isCompleted===true
        })
        store.dispatch('active/getAllactiveTodos',activeList)
        store.dispatch('completed/getAllCompletedTodos',completedList)
       
       
       }
      }catch(err){
         console.log(err,'mounted error')
      }
    })
</script>

<style>

</style>