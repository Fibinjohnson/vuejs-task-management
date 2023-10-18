<template>
<div>
   <NavVue/>
   
  <div class="home">
    <form  @submit.prevent="addTodo">
    <div class="flex justify-center pt-8">
     
      <input @blur="validate('input')" @keypress="validate('input')" :class="{'border border-red-700':errors.input}" class="border border-gray-500 rounded py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" v-model="task.input" type="text" name="todos" id="" placeholder="add todos ....">
      <svg @click="calender" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>
<button class="mb-3" type="submit"> <svg   width="64px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
</button>
    </div>
  </form>
  
  </div>
  <div class="flex justify-center ">
      <DatePicker  v-if="isCalender" v-model="date" mode="dateTime"/>
    </div>
    <p v-if="errors.input" class="flex justify-center text text-red-700  ">Add a todo</p>
    <TodoList/>
    <StatusList/>
</div>

</template>

<script>
import * as Yup from "yup"
const todoInputSchema=Yup.object().shape({
  input:Yup.string().required("Add a todo")
})
import { DatePicker } from 'v-calendar';
import {ref,reactive, onUpdated,watchEffect,inject, computed} from 'vue'
import StatusList from './StatusList.vue'
import 'v-calendar/style.css';
import NavVue from'./NavVue.vue'
import TodoList from "./TodoList.vue"
import {useStore} from 'vuex'

export default {
  name: 'HomeView',
  components: {
     NavVue ,
    DatePicker,
    TodoList,
    StatusList
  },
  setup(){
    const store=useStore()
    const date=ref(new Date())
    const task=ref({
      input:''
    })
    const errors=ref({
      input:''
    })
    const todos=ref([])
    const storeTodos=computed(()=>
       store.state.todos
    )
    
    const isCalender=ref(false)
    const calender=()=>{
      isCalender.value=!isCalender.value      
    }
  
    const todoList=(data)=>{
     todos.value=data.value
    }

    const addTodo=async()=>{
      try{
        todoInputSchema.validate(task.value,{abortEarly:false}).then(async()=>{
          let lastid=Math.max(...storeTodos.value.map(todo=>todo.id))
          if(lastid==-Infinity){
            lastid=0
          }
          console.log(lastid,'last id')
          const res=await fetch('http://localhost:3000/todos',{
          method:'POST',
          headers: {
        'Content-Type':'application/json'
       },
       body:JSON.stringify({
          id:lastid+1,
          todo:task.value.input,
          duedate:new Date(date.value).toLocaleString(),
          isCompleted:false

       })
    })
    if(res.ok){
          todos.value.push()
          store.commit('insertNewTodo',{ id:lastid+1,
          todo:task.value.input,
          duedate:new Date(date.value).toLocaleString(),
          isCompleted:false})
          isCalender.value=!isCalender.value  
          task.value.input=''
          date.value=new Date()
          }
        }).catch((err)=>{
          console.log(err)
          err.inner.forEach((error)=>{
            errors.value={...errors.value,[error.path]:error.message}
          })
        })
      }catch(err){
         console.log(err,'error occured')
      }
    }
    const validate=(field)=>{
       todoInputSchema.validateAt(field,task.value).then(() => (
        errors.value[field]=""
       )).catch((err)=>{
        errors.value[err.path]=err.message
       })

    }

    return {date,task,calender,isCalender,addTodo ,todoList,todos,validate ,errors,storeTodos}
  }

}
</script>
