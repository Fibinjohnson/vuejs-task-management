<template>
<div>
   <NavVue/>
   
  <div class="home">
    <div class="flex justify-center py-10">
      <input  class="border border-gray-500 rounded py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" v-model="task" type="text" name="todos" id="" placeholder="add todos ....">
      <svg @click="calender" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>
<svg @click="addTodo" width="64px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

    </div>
  </div>
  <div class="flex justify-center ">
      <DatePicker  v-if="isCalender" v-model="date" mode="dateTime"/>
    </div>
    <TodoList @todoList="todoList"/>
</div>
</template>

<script>

import { DatePicker } from 'v-calendar';
import {ref,reactive, onUpdated,watchEffect,inject} from 'vue'

import 'v-calendar/style.css';
import NavVue from'./NavVue.vue'
import TodoList from "./TodoList.vue"
export default {
  name: 'HomeView',
  components: {
     NavVue ,
    DatePicker,
    TodoList
  },
  setup(){
    const date=ref(new Date())
    const task=ref(null)
    const todos=ref({})
    const isCalender=ref(false)
    const calender=()=>{
      isCalender.value=!isCalender.value      
    }
  
    const todoList=(data)=>{
     todos.value=data.value

    }
    const addTodo=async()=>{
      try{
      const lastid=Math.max(...todos.value.map(todo=>todo.id))
       const res=await fetch('http://localhost:3000/todos',{
        method:'POST',
        headers: {
        'Content-Type':'application/json'
       },
       body:JSON.stringify({
          id:lastid+1,
          todo:task.value,
          duedate:new Date(date.value).toLocaleDateString(),
          isCompleted:false

       })
    })
       todos.value.push({ id:lastid+1,
          todo:task.value,
          duedate:new Date(date.value).toLocaleDateString(),
          isCompleted:false})
       isCalender.value=!isCalender.value  
      }catch(err){
         console.log(err,'error occured')
      }
    }
    return {date,task,calender,isCalender,addTodo ,todoList}
  }

}
</script>
