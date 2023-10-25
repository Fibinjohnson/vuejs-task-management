const allTodosActions={
    deletefromAll(context,payload){
        context.commit('deleteFromAll',payload)
    },
    addTodo(context,payload){
        context.commit('addTodo',payload)
    }
}
export default allTodosActions