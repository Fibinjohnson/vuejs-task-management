const completedActions={
    getAllCompletedTodos(context,payload){
      context.commit('getAllCompletedTodos',payload)
    },
    deleteTodo(context,payload){
      context.commit('deleteTodo',payload)
    }
  }
export default completedActions