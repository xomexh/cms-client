import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDate } from './hooks/useDate';
import moment from "moment";
import jwtDecode from 'jwt-decode';

import '../styles/calender2.css'

const Calender2 = () => {
    const [nav, setNav] = useState(0);
    const [clicked, setClicked] = useState();

    const [att,setAtt]=useState(0)
    const { days, dateDisplay } = useDate(nav);
    const [events,setEvents]=useState({date:'',month:''})

    useEffect(()=>{
        const jwt = localStorage.getItem("token")

        if(!jwt)
        return navigate("/error")
        const user = jwtDecode(jwt);

        const promise = axios.get(`http://localhost:3000/attendance/${user.user.uname}`)
        promise.then((response)=>{
            console.log(response)
            setAtt(prevstate =>({...prevstate,date:moment(response.data[0].date).format('DD')}))
            setAtt(prevstate =>({...prevstate,month:moment(response.data[0].date).format('MMMM YYYY')}))
        }).catch((err)=>console.log(err))
    },[])


    return(
      <>
        <div id="container">
          <CalendarHeader 
            dateDisplay={dateDisplay}
            onNext={() => {setNav(nav + 1);}}
            onBack={() => {setNav(nav - 1);}}
          />
  
          <div id="weekdays">
            <div>Sunday</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
          </div>
  
          <div id="calendar">
            {days.map((d, index) => (
              <Day
                key={index}
                day={d}
                att={att}
                dateDisplay={dateDisplay}
                onClick={() => {
                  if (d.value !== 'padding') {
                    setClicked(d.date);
                    console.log(d.date)
                  }
                }}
              />
            ))}
          </div>
        </div>
  
        {/* {
          clicked && !eventForDate(clicked) &&
          <NewEventModal
            onClose={() => setClicked(null)}
            onSave={title => {
              setEvents([ ...events, { title, date: clicked }]);
              setClicked(null);
            }}
          />
        } */}
  
        {/* {
          clicked && eventForDate(clicked) &&
          <DeleteEventModal 
            eventText={eventForDate(clicked).title}
            onClose={() => setClicked(null)}
            onDelete={() => {
              setEvents(events.filter(e => e.date !== clicked));
              setClicked(null);
            }}
          />
        } */}
      </>
    );
};

const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {

    return(
      <div id="header">
        <div id="monthDisplay">{dateDisplay}</div>
        <div>
          <button onClick={onBack} id="backButton">Back</button>
          <button onClick={onNext} id="nextButton">Next</button>
        </div>
      </div>
    );
};

const Day = ({ day, onClick,att,dateDisplay }) => {
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
    
    return (
      <div onClick={onClick} className={className}>
        {day.value === 'padding' ? '' : day.value}

        {dateDisplay==att.month ? day.value !== 'padding' ? day.value == att.date ?<div className='event'>Present</div>:<div className='event-absent'>Absent</div>:'':''}
      </div>
    );
};


export default Calender2;
