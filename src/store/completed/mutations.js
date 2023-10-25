const completedMutations={
    getAllCompletedTodos(state,todos){
        state.completedTodos=todos
    },

    deleteTodo(state,id){
      state.completedTodos=state.completedTodos.filter((todo)=>{
          return todo.id!==id
      })
   },
  }
  export default completedMutations