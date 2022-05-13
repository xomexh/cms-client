import React,{useState,useEffect} from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AddLeave=()=>{
    const navigate = useNavigate();

    const [user,setUser]=useState([])
    const [leave,setLeave]=useState([])
    useEffect(()=>{
        const jwt = localStorage.getItem("token")

        if(!jwt)
        return navigate("/error")

        const user = jwtDecode(jwt);
        setUser(user.user);
    },[])

    const handleChange = e => {
        const { name, value } = e.target;
        setLeave(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd=()=>{
        
        const promise= axios.post('http://localhost:3000/leaves',{
            uname:user.uname,
            request:leave.request,
            typeOfLeave:leave.typeOfLeave,
            reason:leave.reason,
            status:'pending'
        })

        promise.then(response=>console.log(response)).catch(err=>console.log(err))
    }

    return(
        <div>
        
       
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Submit Leave</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label class="labels">No of Days</label>
                                <input type="text" class="form-control" placeholder="No of days" value={leave.request} name="request" onChange={handleChange}/>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label class="labels">Type of Leave</label>
                                <input type="text" class="form-control" placeholder="No of days" name="typeOfLeave" value={leave.typeOfLeave} onChange={handleChange} />
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Reason</label>
                                <input type="text" class="form-control" placeholder="Reason(if any)" name="reason" value={leave.reason} onChange={handleChange} />
                            </div>
                            
                        </div>
                        
                        <div class="mt-5 text-center">
                        <button class="btn btn-primary profile-button" type="button" onClick={(e)=>{
                            e.preventDefault;
                            handleAdd()
                            navigate(`/leaves/${user.uname}`)
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

export default AddLeave