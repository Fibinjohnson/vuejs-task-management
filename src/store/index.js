
import {createStore} from 'vuex'
import completedTodos from './completed'
import activeTodos from './active'

const  store=createStore({
  modules:{
    active:activeTodos,
    completed:completedTodos,
   
  },
    
   
})
export default store



// state:{
//   todos:[]  
// },

// getters:{

//   todoCount(state){
//     return state.todos.length
//   },

//   editModal:(state)=>(id)=>{
//     return state.todos.filter((todo)=>{
//       return todo.id===id
//     })
//   },
//   activeTodos(state){
//      return state.todos.filter((todo)=>{
//          return todo.isCompleted===false
//      }).length
//   },
//   completedTodos(state){
//   return state.todos.filter((todo)=>{
//       return todo.isCompleted===true
//   }).length
//   }
// },

// mutations:{
//     getAllTodos(state,todos){
//          state.todos=todos 
//     },

//      insertNewTodo(state,todos){
//             state.todos.push(todos) 
//      },

    //  deleteTodo(state,id){
    //     state.todos=state.todos.filter((todo)=>{
    //         return todo.id!==id
    //     })
    //  },

//      changeStatus(state,payload){
//        state.todos=state.todos.map((todo)=>{
//         if(todo.id===payload.id){
//            return payload
//         }
//         return todo
//        })
//      },

//      editTodos(state,payload){
//         state.todos=state.todos.map((todo)=>{
//           if(todo.id===payload.id){
//             return payload 
//           }
//           return todo
//         })
//      }
// },
// actions:{
//     getAllTodos(context,payload){
//        context.commit('getAllTodos',payload)
//     },

//     insertNewTodo(context,payload){
//         context.commit('insertNewTodo',payload)
//     },

//     deleteTodo(context,payload){
//         context.commit('deleteTodo',payload)
//     },

//     changeStatus(context,payload){
//         context.commit('changeStatus',payload)
//     },

//     editTodos(context,payload){
//       context.commit('editTodos',payload)
//     }
// }