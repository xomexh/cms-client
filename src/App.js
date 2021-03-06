import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes,useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Login from './Login';
import Dashboard from './Dashboard';
import Error from './ErrorPage';
import Noticeboard from './Noticeboard';
import Navbar from './Navbar';
import EditProfile from './Profiles';
import Employees from './Employees';
import Calender2 from './Calender2';
import EditProjects from './EditProjects';
import Projects from './Projects';
import AddProjects from './addProject';
import Leaves from './Leaves';
import AdminPage from './AdminPage';
import AddEmployees from './AddEmployee';
import AddLeave from './AddLeaveRequests';
import Salary from './Salary';

export function App() {
    
    const [inactive,setInactive]=useState(false)

    useEffect(()=>{

    },[])

    return (
        <Router>
        <div className='app-predev'>
            
            <Navbar onCollapse={(inactive)=>{
                setInactive(inactive)
                 
            }} />
            
            <section className={`main-container${inactive? 'inactive':''}`}>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard/:name" element={<Dashboard/>} />
                <Route path="*" element={<Error/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/notices" element={<Noticeboard/>}/>
                <Route path="/employees" element={<Employees/>}/>
                <Route path="/editprofile" element={<EditProfile/>}/>
                <Route path="/calender" element={<Calender2/>}/>
                <Route path="/editproject/:pname" element={<EditProjects/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/addproject" element={<AddProjects/>}/>
                <Route path="/leaves/:name" element={<Leaves/>} />
                <Route path="/adminpage" element={<AdminPage/>} />
                <Route path="/addemployee" element={<AddEmployees/>} />
                <Route path="/addleave" element={<AddLeave/>} />
                <Route path="/salary" element={<Salary/>} />

            </Routes> 
            </section>
            
            
        </div>
        </Router>
        
    );
}

export default App;