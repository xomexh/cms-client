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
import Profiles from './Profiles';



export function Dashboard() {
    const [data,setData] = useState([])
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
            The KING, always stay the KING
        </h1>
           
            {/* <Noticeboard/> */}
            {/* <Attendance /> */}
            {/* <Employees/>
            <Projects/>
            <Salary/> */}
            {/* <Profiles/> */}
        
    
        </div>
    );
}

export default Dashboard;