import React,{useState,useEffect} from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const EditProjects=()=>{
    const [proj,setProj]=useState([])
    const [members,setMembers]=useState([])

    let {pname} = useParams();

    useEffect(()=>{
        // console.log(props.data)
        // setProj(props.data)

        const promise = axios.get(`http://localhost:3000/project/${pname}`)
        promise.then((response)=>{
            console.log(response.data)
            setProj(response.data)
        }).catch(error=>console.log(error))

        
    },[])

    const handleChange = e => {
        const { name, value } = e.target;
        setProj(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd =()=>{
        console.log(members)
    }

    const handleMember=(event,index)=>{
        const { name, value } = event.target;
    }


    return(
        <div>
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
                            <h4 class="text-right">Edit Project</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label class="labels">Project Name</label>
                                <input type="text" class="form-control" placeholder="first name" value={proj.name} name="name" onChange={handleChange}/>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label class="labels">Date of Starting</label>
                                <input type="text" class="form-control" placeholder="Starting Date in DD-MM-YYYY format" name="startDate" value={proj.startDate} onChange={handleChange} />
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Project Lead</label>
                                <input type="text" class="form-control" placeholder="Who's the Project Lead" name="projectLead" value={proj.projectLead} onChange={handleChange} />
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Members</label>
                                {/** members stuff here */}
                                {proj.members?.map((member,index)=>{
                                    return <Member key={index} data={member} proj={proj} arrindex={index} handleChange={handleChange} handleMember={handleMember}/>
                                    // console.log(index,member.rating)
                                    // return(
                                    //     <div key={index}>
                                    //         <div class="row mt-2">
                                    //             <div class="col-md-6">
                                    //             <label class="labels">Remark</label>
                                    //             <input type="text" 
                                    //             class="form-control" 
                                    //             placeholder="Enter Remarks" 
                                    //             value={member.remark} 
                                    //             name="remark" 
                                    //             onChange={event=> handleMember(event,index)}/>
                                    //         </div>
                                    //         <div class="col-md-6">
                                    //             <label class="labels">Rating</label>
                                    //             <input type="text" 
                                    //             class="form-control" 
                                    //             placeholder="Ratings out of 10" 
                                    //             value={member.rating} 
                                    //             name="rating" 
                                    //             onChange={event=>handleMember(event,index)} />
                                    //         </div>
                                    //     </div>
                                    // </div>
                                    // )
                                })}
                            </div>
                            
                        </div>
                        
                        <div class="mt-5 text-center">
                        <button class="btn btn-primary profile-button" type="button" onClick={(e)=>{
                            e.preventDefault;
                            handleAdd()
                        }}>Save Changes</button>
                            {/* <input type="submit" className="btn btn-primary"/> */}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </div>
    )
}


const Member=(props)=>{
    const [member,setMember]=useState([])
    const [employee,setEmployee]=useState([])

    useEffect(()=>{
        const promise= axios.get(`http://localhost:3000/employees/${props.data.empId}`)
        promise.then(response=>setEmployee(response.data))

        setMember(props.data)

    },[])

    const handleChange = e => {
        const { name, value } = e.target;
        setMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd=()=>{
        console.log(member)
        const promise= axios.put(`http://localhost:3000/project/${props.proj.name}/${member.empId}`,member)
        // console.log(props.proj.name,member.empId)
        promise.then(response=>console.log(response))

    }

    return(
        <div>
            {employee.firstname} {employee.lastname}
            <div class="row mt-2">
                <div class="col-md-6">
                    <label class="labels">Remark</label>
                    <input type="text" class="form-control" placeholder="Enter Remarks" value={member.remark} name="remark" onChange={handleChange}/>
                </div>
                <div class="col-md-6">
                    <label class="labels">Rating</label>
                     <input type="text" class="form-control" placeholder="Ratings out of 10" value={member.rating} name="rating" onChange={handleChange} />
                </div>
                <button class="btn btn-primary profile-button" type="button" onClick={(e)=>{
                            e.preventDefault;
                            handleAdd()
                        }}>Save</button>
            </div>
        </div>
    )
}

export default EditProjects;