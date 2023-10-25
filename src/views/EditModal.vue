<template>
     <v-row justify="center">
    <v-dialog
      v-model="toEdit"
      persistent
      width="450"
    >
      <v-card>
        <form  @submit.prevent="editTodoList(modalValue)"> 
        <v-card-title>
          <span class="text-h5"> Edit Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
            
              >
                <v-text-field
                  label="Edit Todo"
                 v-model="modalValue.todo"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
           
              <v-col
                cols="12"
                sm="6"
              >
              <svg @click="calender" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
             </svg>
            
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <div class="flex">
                <DatePicker  class="flex justify-center " v-if="isCalender" v-model="modalValue.duedate" mode="dateTime"/>

             </div>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="$emit('closeModal')"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
           type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
    </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import {useStore} from 'vuex'
import {ref,toRefs,watch,defineProps,defineEmits,computed} from 'vue'
import { DatePicker } from 'v-calendar';
import {editPromise} from "../services/todoHelpers"
const store=useStore()


const props=defineProps({
    dialog:Boolean,
    todos:Object
  
})

const emit=defineEmits(['closeModal'])
const isCalender=ref(false)
const {dialog,todos}=toRefs(props)
const calender=()=>{
     isCalender.value= !isCalender.value
     
}
const toEdit=ref(dialog)
const modalValue=ref(todos)
const editTodoList=async(todos)=>{
    try{
      const res=await editPromise({
      id:todos.id,
      duedate:new Date(todos.duedate).toLocaleString(),
      todo:todos.todo,
      isCompleted:todos.isCompleted
     })
     emit('closeModal')
     if(res.statusText==='OK'){
      store.dispatch('active/editTodos',{
      id:todos.id,
      todo:todos.todo,
      duedate:new Date(todos.duedate).toLocaleString(),
      isCompleted:todos.isCompleted
     })
   }
    }catch(err){
        console.log(err,"edit error ")
    }
}
</script>

