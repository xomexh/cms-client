import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams,useNavigate } from 'react-router-dom';

import '../styles/adminpage.css'

const AdminPage=()=>{

    const [admin,setAdmin]=useState(false)
    let navigate = useNavigate();
    useEffect(()=>{
        // const jwt=localStorage.getItem("token")

        // if(!jwt)
        // return navigate("/error")

        // const user = jwtDecode(jwt);
        // setData(user.user.isAdmin);
    },[])

    return(
        <div className='admin-page'>
            <button className="btn btn-success inAdmin" onClick={(e)=>{
              navigate(`/leaves/all`)
            }}>Show Leave Requests</button><br/>

            <button className="btn btn-success inAdmin" onClick={(e)=>{
              navigate(`/addproject`)
            }}>Add New Project</button><br/>

            <button className="btn btn-success inAdmin" onClick={(e)=>{
              navigate(`/addemployee`)
            }}>Add Employee</button>
        </div>
    )
}

export default AdminPage;