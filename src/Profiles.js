import React,{useState,useEffect} from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const Profiles =()=>{
    const [profile,setProfile]=useState([])
    useEffect(()=>{
        try{
            const user=jwtDecode(localStorage.getItem("token"))
            console.log(user.user.uname)
            const promise = axios.get(`http://localhost:3000/employees/${user.user.uname}`)
            promise.then((response)=>{
                console.log(response)

                setProfile(response.data)
            })
        }catch{}
    },[])

    return(
        <div>
            emp Id: {profile._id}
            Name: {profile.name}
            Age: {profile.age}
            Current Project: {profile.project}
        </div>
    )
}

export default Profiles;