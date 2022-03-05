import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Noticeboard from './Noticeboard';

export function Profile() {
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

    return (
        <div>
            <h1>
                Welcome {data.uname}     
            </h1>
            <button onClick={()=>{
                    localStorage.clear();
                    navigate("/login")
                }}>
                    LogOut
            </button>

            <div>
                Ethi heba
            </div>
            <Noticeboard/>
        </div>
    );
}

export default Profile;