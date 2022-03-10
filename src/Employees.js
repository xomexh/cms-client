import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';

const Employees=()=>{
    const [employees,setE]=useState([])

    useEffect(()=>{
        const promise =axios.get('http://localhost:3000/employees');
        promise.then((response)=>{
            setE(response.data)
        }).catch(error => console.log(error))

    },[])

    return(
        <div>
            Eita Employees stuff 
            {employees.map((employee=>(
                <Employee key={employee._id} data={employee}/>
            )))}
        </div>
    )
}

const Employee =(props)=>{
    const [employee,setEmp] = useState([])
    useEffect(()=>{
        setEmp(props.data)
    },[])

    return(
        <div>
           name: {employee.name} 
           age: {employee.age}
           current project: {employee.project}

           experience of {employee.exp}

        </div>
    )
}

export default Employees;