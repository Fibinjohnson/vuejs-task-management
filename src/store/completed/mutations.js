const completedMutations={
    getAllCompletedTodos(state,todos){
        state.completedTodos=todos
    },

    deleteTodo(state,id){
      state.completedTodos=state.completedTodos.filter((todo)=>{
          return todo.id!==id
      })
   },

   changeStatus(state,payload){
           state.completedTodos.push(payload)
         },
  removeItem(state,id){
    state.completedTodos=state.completedTodos.filter((todos)=>{
        return todos.id!==id
    })
  }
  }
  export default completedMutations