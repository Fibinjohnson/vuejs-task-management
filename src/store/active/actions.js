const activeActions={
    insertNewTodo(context,payload){
     context.commit('insertNewTodo',payload)
  },

   editTodo(context,payload){
    context.commit('editTodo',payload)
  },
  getAllactiveTodos(context,payload){
    context.commit('getAllactiveTodos',payload)
  }

}
export default activeActions