const completedActions={
    getAllCompletedTodos(context,payload){
      context.commit('getAllCompletedTodos',payload)
    },
    deleteTodo(context,payload){
      context.commit('deleteTodo',payload)
    },
    changeStatus(context,payload){
        context.commit('changeStatus',payload)
    },
    removeItem(context,payload){
        context.commit('removeItem',payload)
      }
  }
export default completedActions