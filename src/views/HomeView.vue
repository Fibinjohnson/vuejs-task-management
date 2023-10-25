<template>
<div>
   <NavVue/>
   <div class="home">
      <v-responsive
    class="mx-auto"
    max-width="344"
  >
  <form  @submit.prevent="addTodo">
    <div class="flex justify-center pt-8">
      <v-text-field
      :rules="[rules.required]"
      v-model="task.input" 
      clearable
      label="Add todo"
     ></v-text-field>
     <div class="p-x pt-2">
      <svg @click="calender" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 ">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>
     </div>

   
 <div class="p-3">
  <v-btn  
     block rounded="xl" 
     size="small"
     type="submit"
     elevation="10"
     >
       Add
     </v-btn>
 </div>
    </div>
  </form>
  </v-responsive>
  </div>
  <div class="flex justify-center ">
      <DatePicker  v-if="isCalender" v-model="date" mode="dateTime"/>
    </div>
    <p v-if="errors.input" class="flex justify-center text text-red-700  ">Add a todo</p>
    <TodoList/>
    <StatusList/>
</div>
</template>

<script setup>
import * as Yup from "yup"

const todoInputSchema=Yup.object().shape({
  input:Yup.string().required("Add a todo")
})
import { DatePicker } from 'v-calendar';
import {ref, computed} from 'vue'
import StatusList from './StatusList.vue'
import 'v-calendar/style.css';
import NavVue from'./NavVue.vue'
import TodoList from "./TodoList.vue"
import {useStore,mapState,mapActions} from 'vuex'
import { addNewTodos } from '../services/todoHelpers';
  
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
       store.state.active.allTodos
    )
    const rules = {
  required: (value) => !!value || 'Field is required',
};
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
          console.log(lastid)
          if(lastid==-Infinity){
            lastid=0
          }
          const toAddList=  {
          id:lastid+1,
          todo:task.value.input,
          duedate:new Date(date.value).toLocaleString(),
          isCompleted:false}
          const res=await addNewTodos(toAddList)
        if(res.statusText==='Created'){
          store.dispatch('active/insertNewTodo',toAddList)
          isCalender.value=false 
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


</script>
