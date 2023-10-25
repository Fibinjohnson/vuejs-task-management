const activeActions={
    insertNewTodo(context,payload){
     context.commit('insertNewTodo',payload)
  },

   editTodo(context,payload){
    context.commit('editTodo',payload)
  },
  getAllactiveTodos(context,payload){
    context.commit('getAllactiveTodos',payload)
  },
  editTodos(context,payload){
    context.commit('editTodos',payload)
     },
   getAllTodos(context,payload){
     context.commit('getAllTodos',payload)
     },
   changeStatus(context,payload){
     context.commit('changeStatus',payload)
     },
  removeItem(context,payload){
    context.commit('removeItem',payload)
  }



}
export default activeActions