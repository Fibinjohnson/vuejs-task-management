const activeMutations={
    getAllactiveTodos(state,todos){
      state.activeTodos=todos
    },
  
    insertNewTodo(state,todo){
      state.activeTodos.push(todo)
      
    },
    editTodo(state,payload){
      state.activeTodos=state.activeTodos.map((todo)=>{
         if(todo.id===payload.id){
           return payload 
          }
         return todo
         })
    },

    editTodos(state,payload){
        state.activeTodos=state.activeTodos.map((todo)=>{
          if(todo.id===payload.id){
            return payload 
          }
            return todo
            })
         },

    changeStatus(state,payload){
      state.activeTodos.push(payload)
 
    },
    removeItem(state,payload){
        state.activeTodos=state.activeTodos.filter((todos)=>{
            return todos.id!==payload
        })
    } ,
    

   }
export default activeMutations