import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';

import logo from '../logo.png'
import Accordion from 'react-bootstrap/Accordion'

const Employees=()=>{
    const [employees,setE]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);

    useEffect(()=>{
        const promise =axios.get('http://localhost:3000/employees/all');
        promise.then((response)=>{
            setE(response.data)
        }).catch(error => console.log(error))

    },[])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = employees.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div>
            <h3>Employees</h3>
            {currentPosts.map((employee=>(
                <Employee key={employee._id} data={employee}/>
            )))}
            <div>
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={employees.length}
            paginate={paginate}
             /> 
            </div>
            
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
           {/* name: {employee.name} 
           age: {employee.age}
           current project: {employee.project}

           experience of {employee.exp} */}

           <Accordion>
               <Accordion.Item eventKey={employee._id}>
                   <Accordion.Header>
                        <img style={{'width':'30px','borderRadius':'20px','margin':'10px'}} src={employee.profilePhoto} alt=""/>
                        {employee.firstname} {employee.lastname}
                   </Accordion.Header>
                   <Accordion.Body>
                    current project: {employee.currentProject}<br/>
                    
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

export default Employees;