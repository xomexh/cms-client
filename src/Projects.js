import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams,useNavigate } from 'react-router-dom';

import Accordion from 'react-bootstrap/Accordion'


const Projects =()=>{
    const [projects,setProj]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    let navigate = useNavigate();

    useEffect(()=>{
        const promise = axios.get('http://localhost:3000/project/all')
        promise.then((response)=>{
            console.log(response.data)
            setProj(response.data)
        }).catch(error=>console.log(error))
    },[])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = projects.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleEdit=(url)=>{
        navigate(`/editproject/${url}`)
    }

    return(
        <div>
            Eita mo Projects
            {currentPosts.map((project)=>{
                // if(project.members.includes("SomeshY")){
                    return <Project key={project._id} data={project} handleEdit={handleEdit}/>
                // }
            })}
            <div>
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={projects.length}
            paginate={paginate}
             /> 
            </div>
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
            {/* Name of Project:{project.name} */}
            {/* members:{project.members.map(member => member)} 
            later on use the Employee Component to work with this and show a list of enployees in the project
            */} 
            {/* member:{project.members} */}
            {/* Start Date: {project.startDate}
            Project Lead: {project.projectLead} */}

            <Accordion>
               <Accordion.Item eventKey={project._id}>
                   <Accordion.Header>
                        {/* <img style={{'width':'30px','borderRadius':'20px','margin':'10px'}} src={employee.profilePhoto} alt=""/> */}
                        {project.name}
                   </Accordion.Header>
                   <Accordion.Body>
                    Start Date: {project.startDate}<br/>
                    Project Lead: {project.projectLead}<br/>
                    Members:
                    {project.members?.map(member=><Employee key={member._id} data={member}/>)}<br/>

                    <button onClick={(e)=>{
                    e.preventDefault();
                    props.handleEdit(project.name)
                    }}
                    className="btn btn-danger"
                    >Edit
                </button>
                    
                   </Accordion.Body>
               </Accordion.Item>
           </Accordion>
        </div>
    )
}
const Employee =(props)=>{
    const [employee,setEmp] = useState([])
    const [member,setM]=useState([])

    useEffect(()=>{
        const promise= axios.get(`http://localhost:3000/employees/${props.data.empId}`)
        promise.then(response=>setEmp(response.data))

        setM(props.data)
    },[])

    return(
        <div>

           <Accordion>
               <Accordion.Item eventKey={employee._id}>
                   <Accordion.Header>
                        <img style={{'width':'30px','borderRadius':'20px','margin':'10px'}} src={employee.profilePhoto} alt=""/>
                        {employee.firstname} {employee.lastname}
                   </Accordion.Header>
                   <Accordion.Body>
                    Remark:{member.remark}<br/>
                    Rating:{member.rating}<br/>
                    
                   </Accordion.Body>
               </Accordion.Item>
           </Accordion>

        </div>
    )
}

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href='#' className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

export default Projects