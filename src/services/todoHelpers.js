import axios from 'axios'
 export const onCheck=async(todos)=>{
       return new Promise(async(resolve,reject)=>{
        const res= await axios.patch(`http://localhost:3000/todos/${todos.id}`,{
            id:todos.id,
            todo:todos.todo,
            duedate:todos.duedate,
            isCompleted:todos.isCompleted
       })
       resolve(res)
       })
    }
export const deleteTodos=async(id)=>{
    return new Promise(async(resolve,reject)=>{
        const res=await axios.delete(`http://localhost:3000/todos/${id}`)
        resolve(res)
    })
}
export const getAllTodos=()=>{
    return new Promise(async(resolve,reject)=>{
        const res=await axios.get('http://localhost:3000/todos')
        resolve(res)
    })
}
export const addNewTodos=async(addedList)=>{
     return new Promise(async(resolve,reject)=>{
        const res=await axios.post('http://localhost:3000/todos',
        addedList,{ headers: {
         'Content-Type':'application/json'
        }
       })
       resolve(res)
     })
}
