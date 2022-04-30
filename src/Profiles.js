import React,{useState,useEffect} from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

import logo from '../logo.png'

const EditProfiles =()=>{
    const [profile,setProfile]=useState([])
    // const [fname,setFname]=useState('')
    useEffect(()=>{
        try{
            const user=jwtDecode(localStorage.getItem("token"))
            console.log(user.user.uname)
            const promise = axios.get(`http://localhost:3000/employees/${user.user.uname}`)
            promise.then((response)=>{
                console.log(response.data)
                setProfile(response.data)
            })
        }catch{}
    },[])

    const handleChange = e => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate =()=>{
        console.log(profile)
        const promise =axios.put(`http://localhost:3000/employees`,profile)
        promise.then(response=>console.log(response))
        .catch(err=>console.log(err))
    }
    return(
        <div>
            {/* emp Id: {profile._id}<br/>
            Name: {profile.name}<br/>
            Age: {profile.age}<br/>
            Current Project: {profile.project}<br/> */}

        {/* <div class="row">
            <div class="col-lg-4"> */}
                {/* <div class="card mb-4">
                    <div class="card-body text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                        <h5 class="my-3">John Smith</h5>
                        <p class="text-muted mb-1">Full Stack Developer</p>
                        <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                        <div class="d-flex justify-content-center mb-2">
                            <button type="button" class="btn btn-primary">Follow</button>
                            <button type="button" class="btn btn-outline-primary ms-1">Message</button>
                        </div>
                     </div>
                </div> */}

        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
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
                </div>
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile Settings</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label class="labels">Name</label>
                                <input type="text" class="form-control" placeholder="first name" value={profile.firstname} name="firstname" onChange={handleChange}/>
                            </div>
                            <div class="col-md-6">
                                <label class="labels">Surname</label>
                                <input type="text" class="form-control" value={profile.lastname} name="lastname" onChange={handleChange} placeholder="surname"/>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label class="labels">Mobile Number</label>
                                <input type="text" class="form-control" placeholder="Enter phone number" name="mobilenumber" value={profile.mobilenumber} onChange={handleChange} />
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Address Line 1</label>
                                <input type="text" class="form-control" placeholder="Enter address" name="address" value={profile.address} onChange={handleChange} />
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Address Line 2</label>
                                <input type="text" class="form-control" placeholder="Enter City" name="city" value={profile.city} onChange={handleChange}/>
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Postcode</label>
                                <input type="text" class="form-control" placeholder="Enter Postcode" name="pincode" value={profile.pincode} onChange={handleChange}/>
                            </div>
                            <div class="col-md-12">
                                <label class="labels">State</label>
                                <input type="text" class="form-control" placeholder="Enter State" name="state" value={profile.state} onChange={handleChange}/>
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Email ID</label>
                                <input type="text" class="form-control" placeholder="Enter email-id" name="emailid" value={profile.emailid} onChange={handleChange}/>
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Education</label>
                                <input type="text" class="form-control" placeholder="College" name="educationBachelors" value={profile.educationBachelors} onChange={handleChange}/>
                            </div>
                        </div>
                        {/* <div class="row mt-3">
                            <div class="col-md-6">
                                <label class="labels">Country</label>
                                <input type="text" class="form-control" placeholder="country" value=""/>
                            </div>
                            <div class="col-md-6">
                                <label class="labels">State/Region</label>
                                <input type="text" class="form-control" value="" placeholder="state"/>
                            </div>
                        </div> */}
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={(e)=>{
                            e.preventDefault;
                            handleUpdate()
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

export default EditProfiles;