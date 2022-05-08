import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import moment from 'moment'

import '../styles/attendance.css'

const Attendance =()=>{
    const [attendances,setAtds]=useState([])
    let {name} = useParams();
    // const [notPunched,setPunched]=useState(true)

    const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);

    useEffect(()=>{
        const user = jwtDecode(localStorage.getItem("token"));
        const promise = axios.get(`http://localhost:3000/attendance/${user.user.uname}`)
        promise.then((response)=>{
            console.log(response)
            setAtds(response.data)
        })
        console.log('eita use effect')

        // const time = moment(localStorage.getItem("punchIn")).toNow(true)
        console.log(localStorage.getItem("punchIn"))
    },[])

    const handlePunchIn =()=>{
        axios.post('http://localhost:3000/attendance',{
            uname:name,
            date:moment().format("YYYY-MM-DD"),
            punchIn:Date.now()
        }).then((response)=>{
            console.log(response)
            localStorage.setItem('punchIn', true);
            // setPunched(false)
            start()
        })

    }

    const handlePunchOut =()=>{
        axios.post('http://localhost:3000/attendance',{
            uname:name,
            date:moment().format("YYYY-MM-DD"),
            punchOut:Date.now()
        }).then((response)=>{
            console.log(response)
            stop()
        })
    }

    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
      };
    
      var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;
    
      const run = () => {
        if(updatedM === 60){
          updatedH++;
          updatedM = 0;
        }
        if(updatedS === 60){
          updatedM++;
          updatedS = 0;
        }
        if(updatedMs === 100){
          updatedS++;
          updatedMs = 0;
        }
        updatedMs++;
        return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
      };
    
      const stop = () => {
        clearInterval(interv);
        setStatus(2);
      };
    
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
    const h = () => {
       if(props.time.h === 0){
         return '';
       }else {
         return <span>{(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</span>;
       }
    }
    return (
      <div>
         {h()}&nbsp;&nbsp;
         <span>{(props.time.m >= 10)? props.time.m : "0"+ props.time.m}</span>&nbsp;:&nbsp;
         <span>{(props.time.s >= 10)? props.time.s : "0"+ props.time.s}</span>&nbsp;:&nbsp;
         <span>{(props.time.ms >= 10)? props.time.ms : "0"+ props.time.ms}</span>
      </div>
    );
  }

export default Attendance;