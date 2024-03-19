import { SERVER_URL } from "../constants/server_url";
import { useTasksContext } from "../hooks/useTasksContext";
import deleteIcon from '../images/delete-icon-image-15.jpg'
import { useAuthContext } from "../hooks/useAuthContext";
const TaskDetails = ({task}) => {
    const {dispatch}=useTasksContext()
    const {user}=useAuthContext()
    const handleDelete=async()=>{
        if(!user){
            return
        }
        try {
            const response=await fetch(SERVER_URL+'api/task/'+task._id,{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${user.token}`,
                    "Access-Control-Allow-Origin": "*",
                }
            })
            const json=await response.json()
            if(response.ok){
                dispatch({type:'DELETE_TASK',payload:task})
            }
        }
         catch (error) {
            console.log(error)
        }
    }
    return (
        <div class="bg-gray-200 p-4 rounded-md mb-5 flex justify-between shadow-sm shadow-blue-600">
        <div>
        <h2 class="font-semibold text-orange-700">Task : {task.taskInfo}</h2>
            <p>Duration: {task.duration}</p>
            <p>Description:<br/><span class="text-green-500">{task.description}</span></p>
        </div>
        <img class="w-auto h-5" onClick={handleDelete} src={deleteIcon} alt="deleteIcon"/>
        </div>
    )
}
 
export default TaskDetails;