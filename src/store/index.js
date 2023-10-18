
import {createStore} from 'vuex'

const  store=createStore({
    state:{
      todos:[]
    },
    getters:{

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
         }
    },
    actions:{
        getAllTodos(context,todos){
           context.commit('getAllTodos',todos)
        },
        insertNewTodo(context,todos){
            context.commit('insertNewTodo',todos)
        },
        deleteTodo(context,id){
            context.commit('deleteTodo',id)
        }
    }
})
export default store