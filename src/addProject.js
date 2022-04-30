import React,{useState,useEffect} from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Select from 'react-select';

// import Select from 'react-dropdown-select';

const AddProjects=()=>{
    const [E,setE]=useState([])
    const [project,setProject]=useState([])
    
    useEffect(()=>{
        const promise =axios.get('http://localhost:3000/employees/all');
        promise.then((response)=>{
            setE(response.data)
            console.log(response.data)
        }).catch(error => console.log(error))
        console.log('useEffect bhitere')
    },[])

    const handleAdd=()=>{

    }

    const handleChange = e => {
        const { name, value } = e.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate=()=>{
        console.log(project)

    }

    const handleStuff=(value)=>{
        const filterd=[]

        value.map((val)=>{
            const obj={
                empId:val._id
            }
            filterd.push(obj)
        })

        setProject(prevState => ({
            ...prevState,
            members: filterd
        }));
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
        {/* <form onSubmit={handleUpdate}> */}
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
                            <h4 class="text-right">Profile Settings</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label class="labels">Project Name</label>
                                <input type="text" class="form-control" placeholder="first name" value={project.name} name="name" onChange={handleChange}/>
                            </div>
                            {/* <div class="col-md-6">
                                <label class="labels">Surname</label>
                                <input type="text" class="form-control" value=} name="lastname" onChange={handleChange} placeholder="surname"/>
                            </div> */}
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label class="labels">Date of Starting</label>
                                <input type="text" class="form-control" placeholder="Starting Date in DD-MM-YYYY format" name="startingDate" value={project.startingDate} onChange={handleChange} />
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Project Lead</label>
                                <input type="text" class="form-control" placeholder="Who's the Project Lead" name="projectLead" value={project.projectLead} onChange={handleChange} />
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Members</label>
                                {/* <input type="text" class="form-control" placeholder="Enter City" name="city" value={profile.city} onChange={handleChange}/> */}
                                <Select
                                    getOptionLabel={option => option.uname}
                                    getOptionValue={option => option._id}
                                    options={E}
                                    isMulti
                                    name='members'
                                    onChange={handleStuff}
                                />
                            </div>
                            
                        </div>
                        
                        <div class="mt-5 text-center">
                        <button class="btn btn-primary profile-button" type="button" onClick={(e)=>{
                            e.preventDefault;
                            handleUpdate()
                        }}>Add Project</button>
                            {/* <input type="submit" className="btn btn-primary"/> */}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        {/* </form> */}
        </div>
    )
}

export default AddProjects;