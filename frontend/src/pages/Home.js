import {useState,useEffect} from 'react'
import TasksDetails from '../components/TasksDetails'
import loadingImg from '../images/8ac12962c05648c55ca85771f4a69b2d.gif'
import { useTasksContext } from '../hooks/useTasksContext'
import {SERVER_URL} from '../constants/server_url'
import { useAuthContext } from '../hooks/useAuthContext'
let newTaskCounter=0
const Home = () => {
    const [newTask,setNewTask]=useState(false)
    const [taskInfo,setTaskInfo]=useState('');
    const [description,setDescription]=useState('');
    const [duration,setDuration]=useState('');
    const [error,setError]=useState('');
    const [taskSuccess,setTaskSuccess]=useState(false)
    const [loading,setIsLoading]=useState(false)
      // fetch all tasks
      const {tasks,dispatch}=useTasksContext();
      const {user}=useAuthContext()
      useEffect(()=>{
          const fetchTasks=async()=>{
              const response=await fetch(SERVER_URL+'/api/task',{
                headers:{
                    'Authorization':`Bearer ${user.token}`,
                    "Access-Control-Allow-Origin": "*",
                }
              })
              const json=await response.json()
              if(response.ok){
                  console.log("tasks fetched successfully!")
                  dispatch({type:'SET_TASKS',payload:json})
                  console.log(json);
              }
          }
          if(user){
            fetchTasks()
          }
      },[dispatch,user])
//create new tasks
    const handleAddNewTask=async(e)=>{
        setIsLoading(true)
        e.preventDefault()
        if(!user){
            setError("You are not logged in")
            return
        }
        const task={taskInfo,description,duration}
        const response=await fetch(SERVER_URL+'/api/task',{
            method:"POST",
            body:JSON.stringify(task),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`,
                "Access-Control-Allow-Origin": "*",

            }
        })
        const json=await response.json()
        console.log("Task created successfully!");
        if(!response.ok){
            setError(json.error)
        }else
        try{
            setTaskInfo('');
            setDuration('');
            setDescription('');
            dispatch({type:'CREATE_TASK',payload:json})
        }catch(error){
            setError("An error occured while adding the tasks")
        }
        if(response.ok){
            setTaskInfo('');
            setDuration('');
            setDescription('');
            setError('');
            setIsLoading(false);
            // dispatch({type:'CREATE_TASK',payload:json})
        // display success if response is ok
        setTaskSuccess(true)
        setTimeout(() => {
        setTaskSuccess(false)
        },1500);
        }
    }
    const handleNewTask=()=>{
        setNewTask(true)
        newTaskCounter++;
        if(newTaskCounter===2){
            setNewTask(false)
            newTaskCounter=0
        }
    }
    const handleClose=()=>{
        setNewTask(true)
        newTaskCounter++;
        if(newTaskCounter===2){
            setNewTask(false)
            newTaskCounter=0
        }
    }
    return (
        <div class="w-full bg-gray-50">
        <div class="pt-5 w-10/12 m-auto homeholder">
        <h2 class="text-center pb-2">All of us have what we need to do, but keeping track of our tasks can be a challenge sometimes<br/>
        <strong class="text-blue-900 italic">Keep track of your tasks today with no struggle!</strong></h2>
        <button onClick={handleNewTask} class="bg-orange-500 p-2 rounded-md shadow-black shadow-md hover:text-white hover:bg-black">Add New Task</button>
        <img class={`${loading ? 'block' : 'hidden'} w-20 mt-4 m-auto`} src={loadingImg} alt='loading gif'/>
        <h2 class="pt-4 text-red-600 text-center">{error}</h2>
        <h2 class={`text-center text-green-600 ${taskSuccess ? 'block' : 'hidden'}`}>New Task Added Successfully!</h2>
        <form class={`bg-gray-300 shadow-blue-700 shadow-md w-full md:w-96 p-4 rounded-md mt-8 m-auto ${newTask ? 'hidden' : 'block'}`}>
            <label class="text-lg">Task Name:</label><br/>
            <input 
            type="text" 
            class="p-1 w-64 rounded-md shadow-orange-500 shadow-sm"
            placeholder="Reading"
            required
            onChange={(e)=>setTaskInfo(e.target.value)}
            value={taskInfo}
            /><br/>
            <label class="text-lg">Duration:</label><br/>
            <input 
            type="text" 
            class="p-1 w-64 rounded-md shadow-orange-500 shadow-sm"  
            placeholder="2 hours" 
            required
            onChange={(e)=>setDuration(e.target.value)}
            value={duration}
            /><br/>
            <label class="text-lg">Description:</label><br/>
            <textarea  
            class="p-1 w-64 rounded-md shadow-blue-500 shadow-sm"  
            placeholder="Read Rich Dad Poor Dad chapter 1" cols="40" rows="5"
            required
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            ></textarea><br/>
            <button class="bg-blue-700 text-white p-2 rounded w-36 shadow-md shadow-black mt-5 mb-2 text-center hover:bg-red-600"onClick={handleAddNewTask}>Add Task</button>
            <h2 id='closeBtn' class="text-center mt-4"><span onClick={handleClose} class={` cursor-pointer w-6 m-auto text-center bg-orange-600 shadow-black shadow-sm p-2 rounded-full hover:bg-red-600 hover:text-white ${newTask ? 'hidden' :'block'}`}>X</span></h2>
        </form>
        <section>
            <h2 class="pt-5 pb-5 font-semibold text-blue-800">My Tasks:</h2>
            <div>
            {tasks && tasks.map((task)=>(
                <TasksDetails key={task._id} task={task}/>
            ))}
            </div>
        </section>
        </div>
        </div>
    );
}
 
export default Home;