import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom";

import Noticeboard from './Noticeboard';
import Attendance from './Attendance';
import Employees from './Employees';
import Projects from './Projects';
import Salary from './Salary';
import EditProfiles from './Profiles';
import Calendar from './Calender';
import Calender2 from './Calender2';
import TodoList from './TodoList';
import AddEmployees from './AddEmployee';
import AddProjects from './addProject';
import EditProjects from './EditProjects';
import Leaves from './Leaves';

const  Dashboard=()=> {
    const [data,setData] = useState({
        _id: "626cbca6e9c8c926bed5c615",
        name: "TestProject",
        startDate: "2022-03-22T00:00:00.000Z",
        projectLead: "Somesh",
        members: [
            {
                "empId": "6256b0f6e75a3d0482c67f1d",
                "_id": "626cbca6e9c8c926bed5c616",
                // "remark": "good boy",
                // "rating": 7
            },
            {
                "empId": "6264efe6544f50af3314d894",
                "_id": "626cbca6e9c8c926bed5c617"
            }
        ],
        __v: 0
    })
    let navigate = useNavigate();
    let {name} = useParams();

    useEffect(()=>{
        try{
          
            const jwt = localStorage.getItem("token")

            if(!jwt)
            return navigate("/error")

            const user = jwtDecode(jwt);
            setData(user.user);
            console.log(user.user)

            if(name!=user.user.uname)
            return navigate("/error")

            // const promise=axios.get('http://localhost:3000/project/TestProject')
            // promise.then((response)=>{
            //     console.log(response.data)
            //     setData(response.data)
            // })
        }
        catch(ex){}
        

    },[])

    // return (
    //     <div>
    //         <h1>
    //             Welcome {data.uname}     
    //         </h1>
    //         <button onClick={()=>{
    //                 localStorage.clear();
    //                 navigate("/login")
    //             }}>
    //                 LogOut
    //         </button>

    //         <div>
    //             Ethi heba
    //         </div>
    //         {/* <Noticeboard/> */}
    //         {/* <Attendance /> */}
    //         {/* <Employees/>
    //         <Projects/>
    //         <Salary/> */}
    //         <Profiles/>
    //     </div>
    // );

    return(
        <div>
            
        <h1>
            {/* The KING, always stay the KING */}
        </h1>
           
            {/* <Noticeboard/> */}
            {/* <Attendance /> */}
            {/* <Employees/> */}
            {/* <Projects/> */}
            {/* <Salary/> */}
            {/* <EditProfiles/> */}
            {/* <Calendar/> */}
            {/* <Calender2/> */}
            {/* <TodoList/> */}
            {/* <AddEmployees/> */}
            {/* <AddProjects/> */}
            {/* <EditProjects data={data}/> */}
            <Leaves/>
        </div>
    );
}

export default Dashboard;