import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes,useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Login from './Login';
import Dashboard from './Dashboard';
import Error from './ErrorPage';
import Noticeboard from './Noticeboard';
import Navbar from './Navbar';
import Profiles from './Profiles';
import Employees from './Employees';


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
            </Routes>
            </section>
            
            
        </div>
        </Router>
        
    );
}

export default App;