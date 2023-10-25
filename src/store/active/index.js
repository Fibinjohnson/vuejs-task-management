import activeActions from "./actions"
import activeGetters from "./getters"
import activeMutations from "./mutations"
const activeTodos={
    namespaced: true,
    state:{
      activeTodos:[],
    },
  
    getters:activeGetters,
  
    mutations:activeMutations,
  
    actions:activeActions
  
    
  }
  export default activeTodos