import completedGetters from "./getters"
import completedMutations from "./mutations"
import completedActions from "./actions"
const completedTodos={
    namespaced: true,
    state:{
      completedTodos:[]
    },
    getters:completedGetters,
  
    mutations:completedMutations,
    
    actions:completedActions
  
  }
  export default completedTodos