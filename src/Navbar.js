import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

import logo from '../logo.png'
import '../styles/dashboard.css'

export function Navbar(){
    const [data,setData] = useState([])
    const [inactive, setInactive] = useState(false);
    let navigate = useNavigate();
    useEffect(()=>{
        try{
            const jwt = localStorage.getItem("token")
            const user = jwtDecode(jwt);
            setData(user.user);
            console.log(user.user)
            if (inactive) {
                removeActiveClassFromSubMenu();
              }
            props.onCollapse(inactive)
        }
        catch(ex){

        }
            
    },[inactive])

    const removeActiveClassFromSubMenu = () => {
        document.querySelectorAll(".sub-menu").forEach((el) => {
          el.classList.remove("active");
        });
      };

    return(
        
        <nav className="sidebar">
        <header>
            <div className="image-text">
                <span className="image">
                    <img src={logo} alt=""/>
                </span>

                <div className="text logo-text">
                    <span className="name">Welcome</span>
                    <span className="profession">CMS</span>
                </div>
            </div>

            <i className='bx bx-chevron-right toggle'></i>
        </header>

        <div className="menu-bar">
            <div className="menu">

                <ul className="menu-link">
                    
                    <li className='nav-link'>
                        <Link to={`/dashboard/${data.uname}`}>
                            <i className='bx bx-home-alt icon' />
                            <span className='text nav-text'>Dashboard </span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/notices'>
                            <i className='bx bx-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Noticeboard</span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/employees'>
                            <i className='bx bx-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Employees(employees.js)</span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/calender'>
                            <i className='bx bx-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Calendar</span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/editprofile'>
                            <i className='bx bx-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Edit Profile</span>
                        </Link>
                    </li>

                    


                    


                </ul>
            </div>

            <div className="bottom-content">
                <li className="">
                    <a onClick={()=>{
                    localStorage.clear();
                    navigate("/login")
                    }}>
                        <i className='bx bx-log-out icon' />
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>


                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">Dark mode</span>

                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
                
            </div>
        </div>

            </nav>
        
    )
}

export default Navbar;