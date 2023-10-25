import allTodosActions from "./actions"
import allTodosMutations from "./mutations"
const allTodos={
    namedSpace:true,
    state:{
        allTodos:[]
    },
    actions:allTodosActions,
    mutations:allTodosMutations
}
export default allTodos