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
            </Routes>
            </section>
            
            
        </div>
        </Router>
        
    );
}

export default App;