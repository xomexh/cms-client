import React,{useState,useEffect} from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AddEmployees=()=>{
    const [employee,setEmployee]=useState({
        uname:'',
        password:''
    })
    const handleAdd=()=>{
        const promise = axios.post('http://localhost:3000/login',employee)
        promise.then(response=>console.log(response))
        .catch(err=>console.log(err))

    }

    const handleChange = e => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    return(
        <div>
            <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                {/* <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src={profile.profilePhoto}/><span class="font-weight-bold">{`${profile.uname}`}</span><span class="text-black-50">{profile.emailid}</span><span> </span></div>
                    <FileBase64
                        multiple={ false }
                        onDone={({base64})=>{
                            setProfile(prevState => ({
                                ...prevState,
                                profilePhoto: base64
                            }))
                            console.log(base64)
                        } } />
                </div> */}
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Add User</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label class="labels">Username</label>
                                <input type="text" class="form-control" placeholder="Username" value={employee.uname} name="uname" onChange={handleChange}/>
                            </div>
                            <div class="col-md-6">
                                <label class="labels">Password</label>
                                <input type="text" class="form-control" value={employee.password} name="password" onChange={handleChange} placeholder="Password"/>
                            </div>
                        </div>
                        
                        
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={(e)=>{
                            e.preventDefault;
                            handleAdd()
                        }}>Save Profile</button></div>
                    </div>
                </div>
                {/* <div class="col-md-4">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center experience">
                            <span>Edit Experience</span><span class="border px-3 p-1 add-experience">
                                <i class="fa fa-plus"></i>&nbsp;Experience
                            </span>
                        </div><br/>
                        <div class="col-md-12">
                            <label class="labels">Experience in Designing</label>
                            <input type="text" class="form-control" placeholder="experience" value=""/>
                        </div> <br/>
                        <div class="col-md-12">
                            <label class="labels">Additional Details</label>
                            <input type="text" class="form-control" placeholder="additional details" value=""/>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        </div>
    )
}

export default AddEmployees;