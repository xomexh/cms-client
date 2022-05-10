import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import moment from 'moment'

import '../styles/attendance.css'

const Attendance =()=>{
    let {name} = useParams();

    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("punchIn")){
            setTimerOn(true)
        }

       let interval=null;

       if (timerOn) {
        interval = setInterval(() => {
            var punch=localStorage.getItem("punchIn")
            var diff=Date.now()-punch
            setTime(diff)
        }, 1000);
      }else if(!timerOn){
          clearInterval(interval)
      }
  
      return () => clearInterval(interval);
       
    },[timerOn])

    const handlePunchIn =()=>{
        setTimerOn(true)
        axios.post('http://localhost:3000/attendance',{
            uname:name,
            date:moment().format("YYYY-MM-DD"),
            punchIn:Date.now()
        }).then((response)=>{
            console.log(response)
            localStorage.setItem('punchIn', Date.now());
        })
        

    }

    const handlePunchOut =()=>{
        axios.post('http://localhost:3000/attendance',{
            uname:name,
            date:moment().format("YYYY-MM-DD"),
            punchOut:Date.now()
        }).then((response)=>{
            console.log(response)
        })
        localStorage.removeItem('punchIn')
    }

      
    
    //   const reset = () => {
    //     clearInterval(interv);
    //     setStatus(0);
    //     setTime({ms:0, s:0, m:0, h:0})
    //   };
    
    //   const resume = () => start();
    return(
        <div className='attendance-app'>
            <div className='clock-holder'>
                <div className='stopwatch'>
                    <DisplayComponent time={time}/>
                    {!localStorage.getItem("punchIn")? <button onClick={(e)=>{
                        e.preventDefault();
                        handlePunchIn()
                        
                    }}  className="btn btn-success">
                        Punch IN
                    </button>:
                    <button onClick={(e)=>{
                        e.preventDefault();
                        setTimerOn(false)
                        handlePunchOut()

                    }}  className="btn btn-warning">
                        Punch OUT
                    </button>}
                </div>
            </div>
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

function DisplayComponent(props) {
    return (
      <div>
        <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:</span>
        {/* <span>{("0" + ((props.time / 10) % 100)).slice(-2)}</span> */}
      </div>
    );
  }

export default Attendance;