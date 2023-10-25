const allTodosMutations={
    deletefromAll(state,payload){
        state.allTodos=state.allTodos.filter((todos)=>{
            return todos.id!== payload
        })
    },
    addTodo(state,payload){
        state.allTodos.push(payload)
    }
}
export default allTodosMutations