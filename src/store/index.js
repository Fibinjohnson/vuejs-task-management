
import {createStore} from 'vuex'

const  store=createStore({
    state:{
      todos:[]
    },
    getters:{
      pendingList(state){
        return state.todos.length
      }
    },
    mutations:{
        getAllTodos(state,todos){
             state.todos=todos
        },
         insertNewTodo(state,todos){
                state.todos.push(todos)
         },
         deleteTodo(state,id){
            state.todos=state.todos.filter((todo)=>{
                return todo.id!==id
            })
         },
         changeStatus(state,payload){
           state.todos=state.todos.map((todo)=>{
            if(todo.id===payload.id){
               return payload
            }
            return todo
           })
         }
    },
    actions:{
        getAllTodos(context,payload){
           context.commit('getAllTodos',payload)
        },
        insertNewTodo(context,payload){
            context.commit('insertNewTodo',payload)
        },
        deleteTodo(context,payload){
            context.commit('deleteTodo',payload)
        },
        changeStatus(context,payload){
            context.commit('changeStatus',payload)
        }
    }
})
export default store