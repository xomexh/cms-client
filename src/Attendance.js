import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import moment from 'moment'

const Attendance =()=>{
    const [attendances,setAtds]=useState([])
    let {name} = useParams();
    const [notPunched,setPunched]=useState(true)
    const [timer,setTimer]=useState(0)

    useEffect(()=>{
        const user = jwtDecode(localStorage.getItem("token"));
        const promise = axios.get(`http://localhost:3000/attendance/${user.user.uname}`)
        promise.then((response)=>{
            console.log(response)
            setAtds(response.data)
        })
        console.log('eita use effect')

        const time = moment(localStorage.getItem("punchIn")).toNow(true)
        console.log(time)
    },[])

    const handlePunchIn =()=>{
        axios.post('http://localhost:3000/attendance',{
            uname:name,
            date:"2022-09-25",
        }).then((response)=>{
            console.log(response)
            localStorage.setItem('punchIn', response.data.punchIn);
            setPunched(false)
        })
    }

    const handlePunchOut =()=>{
        axios.post('http://localhost:3000/attendance',{
            uname:name,
            date:"2022-09-25",
            punchOut:"2022-03-08T11:58:23.664Z"
        }).then((response)=>{
            console.log(response)
        })
    }

    const formatTime = (timer) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
      
        return `${getHours} : ${getMinutes} : ${getSeconds}`
      }

    const getTime = ()=>{
        const time = moment(localStorage.getItem("punchIn")).toNow(true)
        console.log(time)
    }


    return(
        <div>
            {/* This is attendance sheet:
            {attendances.map((attendance=>(
                <AttendanceLI key={attendance._id} data={attendance} />
            )))} */}

            This is attendance
            {notPunched? <button onClick={(e)=>{
                e.preventDefault();
                handlePunchIn()
                
            }}>
                Punch IN
            </button>:

            <button onClick={(e)=>{
                e.preventDefault();
                handlePunchOut()
            }}>
                Punch OUT
            </button>}

            
        </div>
    )
}

const AttendanceLI=(props)=>{
    const [attendance,setAtd]=useState([])

    useEffect(()=>{
        console.log(props.data)
        setAtd(props.data)
    },[])

    return(
        <div>
            id:{attendance._id}

            uname:{attendance.uname}
            date:{attendance.date}

            punch in at: {attendance.punchIn}
            punch out at: {attendance.punchOut}


        </div>
    )

}

export default Attendance;