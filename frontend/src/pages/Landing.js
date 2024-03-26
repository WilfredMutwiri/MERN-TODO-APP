import taskImg from '../images/image.gif'
import {Link} from 'react-router-dom'
import {useState} from 'react'
const  Landing= () => {
    const hours=(new Date().getHours())
    const greeting=getGreeting(hours)

    function getGreeting(hour) {
        if (hour >= 5 && hour < 12) {
            return "Good morning";
        } else if (hour >= 12 && hour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    }
    return ( 
        <div class=" w-full pt-10 pb-10 bg-gray-50">
        <div class="w-10/12 m-auto">
        <h2 class="pt-4 pb-4 text-lg font-semibold text-orange-500 text-center md:text-left ">{greeting}!</h2>
        <h3 class="pb-4 text-center font-semibold text-normal md:text-lg">Welcome to the Ultimate ToDo App.</h3>
        <p class="pb-2 text-center font-semibold text-normal md:text-lg">Carefull planning is the path to success.</p>
        <img class="h-64 m-auto" src={taskImg}/>
        <div class="w-60 m-auto">
        <Link to="./Login">
        <button class="p-2 bg-gradient-to-r from-purple-800 to-blue-600 cursor-pointer w-full shadow-sm shadow-black text-white font-semibold rounded-full">Get Started</button>
        </Link>
        </div>
        </div>
        </div>
     );
}
 
export default Landing;