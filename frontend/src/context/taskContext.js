import {createContext,useReducer} from 'react'
//create context
export const TaskContext=createContext();
//create reducer
export const tasksReducer=(state,action)=>{
    switch(action.type){
        case 'SET_TASKS':
            return{
                tasks:action.payload
            }
        case 'CREATE_TASK':
            return{
                tasks:[action.payload,...state.tasks]
            }
        case 'DELETE_TASK':
            return{
                tasks:state.tasks.filter((t)=>t._id!==action.payload._id)
            }
        default:
            return state;
    } 
}
//create tasks provider
export const TasksContextProvider=({ children   })=>{
    const [state,dispatch]=useReducer(tasksReducer,{
        tasks:null})
    return(
        <TaskContext.Provider value={{...state,dispatch}}>
            { children }
        </TaskContext.Provider>
    )
}