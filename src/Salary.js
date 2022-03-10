import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Salary =()=>{
    const [salary,setSalary] = useState([])
    useEffect(()=>{
        const user = jwtDecode(localStorage.getItem("token"));
        const promise = axios.get(`http://localhost:3000/salary/${user.user.uname}`)
        promise.then((response)=>{
            setSalary(response.data)
        }).catch(error => console.log(error))
    },[])

    return(
        <div>
           annual : {salary.package}
           monthly :{salary.monthlyInhand}
           last recived on: {salary.last}

        </div>
    )
}

export default Salary