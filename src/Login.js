import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, useNavigate } from 'react-router-dom';


export function Login(props) {
    const navigate = useNavigate();
    const [name, setUname] = useState('');
    const [password, setPassword] = useState('');

    const [msg, setMsg] = useState('');

    // const handleSubmit=e=>{
    //     e.preventDefault();
    //     console.log('Submitted')
    //     const data = {
    //         "name":name,
    //         "password":password
    //     }
    //     axios.post('http://localhost:3000/user',data).then( (response) =>{
    //         console.log(response.data)
    //         setMsg(response.data)
    //     } ).catch((err) =>{
    //         console.log(err.response)
    //         setMsg(err.response.data)
    //     } )
    // }
    // const handleLogin=e=>{
    //     e.preventDefault();
    //     axios.get(`http://localhost:3000/user/${name}`)
    //     .then((response) =>{
    //         console.log(response.data.name);
    //         setMsg(`${response.data.name} is logged in now - response block`);
    //     } )
    //     .catch((err) =>{
    //         console.log(err.response.data);
    //         setMsg(`${err.response.data} in error block`);
    //     } )
    // }
    const handleLogin = e => {
        e.preventDefault();

        axios.post('http://localhost:3000/auth', {
            uname: name,
            password: password,
        }).then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data);
            navigate(`/dashboard/${name}`);
        }).catch((error) => {
            alert(error)
            console.log(error.response);
            setMsg(error.response.data)
        });
    };

    return (
        <div>
            <h1>
                Log-In Page for Demonstration
            </h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setUname(e.currentTarget.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />

                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1" />

                </div>
                {/* <button type="submit" class="btn btn-primary" style={{'cursor':'pointer','zIndex':'99'}} >Submit</button> */}
                <input type="submit" className="btn btn-primary"/>
            </form>

            <p>
                {msg}
            </p>
        </div>
    );
}

export default Login;