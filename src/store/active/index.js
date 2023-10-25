import activeActions from "./actions"
import activeGetters from "./getters"
import activeMutations from "./mutations"
const activeTodos={
    namespaced: true,
    state:{
      activeTodos:[],
      allTodos:[]
    },
  
    getters:activeGetters,
  
    mutations:activeMutations,
  
    actions:activeActions
  
    
  }
  export default activeTodos