
import {createStore} from 'vuex'

const  store=createStore({
    state:{
      todos:[]
    },
    getters:{

    },
    mutations:{
        changeTodos(state,todos){
             state.todos=todos
             console.log(state.todos,'title store')
        }
    },
    actions:{
        
    }
})
export default store