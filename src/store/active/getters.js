const activeGetters={
       
    editModal:(state)=>(id)=>{
      const captId=id
      const modal= state.activeTodos.filter((todo)=>{
         return todo.id===captId
      })
      return modal
    },
    activeCount:(state)=>{
      return state.activeTodos.length
    }
  }
export default activeGetters