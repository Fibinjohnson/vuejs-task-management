const activeGetters={
       
    editModal:(state)=>(id)=>{
        console.log(id,'id')
        const captId=id
        console.log(state)
        console.log(state.activeTodos,'active')
      const modal= state.activeTodos.filter((todo)=>{
        
         return todo.id===captId
      })
      console.log(modal,'modal')
      return modal
    },
    activeCount:(state)=>{
      return state.activeTodos.length
    }
  }
export default activeGetters