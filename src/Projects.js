import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';

const Projects =()=>{
    const [projects,setProj]=useState([])

    useEffect(()=>{
        const promise = axios.get('http://localhost:3000/project')
        promise.then((response)=>{
            console.log(response.data)
            setProj(response.data)
        }).catch(error=>console.log(error))
    },[])

    return(
        <div>
            Eita mo Projects
            {projects.map((project)=>{
                // if(project.members.includes("SomeshY")){
                    return <Project key={project._id} data={project}/>
                // }
            })}
        </div>
    )
}

const Project=(props)=>{
    const [project,setProject]=useState([]) 
    useEffect(()=>{
        console.log(props.data)
        setProject(props.data)
    },[])

    return(
        <div>
            name:{project.name}
            {/* members:{project.members.map(member => member)} 
            later on use the Employee Component to work with this and show a list of enployees in the project
            */} 
            member:{project.members}
            start Date: {project.startDate}
        </div>
    )
}

export default Projects