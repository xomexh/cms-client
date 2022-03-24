import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

const Noticeboard = ()=>{
    const [notices,setNotices]=useState([])

    useEffect(()=>{
        const promise = axios.get('http://localhost:3000/messages/all')
        promise.then((response)=>{
            console.log(response)
            setNotices(response.data)
        })
        console.log('eita use effect')
    },[])

    const handleDelete =(id)=>{
        const original = notices;
        console.log('eithi')
        const changed= original.filter((change)=> change._id !== id)
        setNotices(changed)
        axios.delete(`http://localhost:3000/messages/${id}`).then((response)=>{
            console.log(response)
        })
        console.log(id)
    }

    const handleAdd=(from,to,msg,id)=>{
        axios.post('http://localhost:3000/messages', {
            from: from,
            to: to,
            message:msg,
            id:id
        }).then((response) => {
            console.log(response);
            const promise = axios.get('http://localhost:3000/messages/all')
            promise.then((response)=>{
            console.log(response)
            setNotices(response.data)
        })
        });
    }

    return(
        <div>
            This is notice board here
            <div>
            {notices.map((notice => (
                <Notice key={notice._id} data={notice} handleDelete={handleDelete} handleAdd={handleAdd}/>
            )))}
            </div>
            

            <AddNotice handleAdd={handleAdd}/>
        </div>
    )
}

const Notice = (props)=>{
    const [notice,setNotice]=useState([]);

    useEffect(()=>{
        console.log(props.data)
        setNotice(props.data)
    },[])
    return(
        <div>
            Id: {notice._id}<br></br>
            from: {notice.from}<br></br>
            to:{notice.to}<br></br>

            message: {notice.message}<br></br>

            date:{notice.date}<br></br>

            <button onClick={(e)=>{
                e.preventDefault();
                props.handleDelete(notice._id)}}
                >
                Delete
            </button>

            <button onClick={(e)=>{
                e.preventDefault();
                
                //ReactDOM.render(<AddNotice data={notice} handleAdd={props.handleAdd} />, document.getElementById('sandy'));
            }}>
                Update
            </button>
            <div id="sandy"></div>
        </div>
    )
}

const AddNotice=(props)=>{
    const [msg,setMsg]=useState('')
    const [from,setFrom]=useState('')
    const [to,setTo]=useState('')

    useEffect(()=>{
        try{
            setMsg(props.data.message)
            setFrom(props.data.from)
            setTo(props.data.to)
            console.log(props.data)
        }
        catch{
            console.log("catch block")
        }
    },[])

    return(
        <div>
            Add notice here
            <div>
                <input type="text" value={msg} placeholder="message" onChange={(e) => setMsg(e.currentTarget.value)}/>
                <input type="text" value={from} placeholder="from" onChange={(e) => setFrom(e.currentTarget.value)}/>
                <input type="text" value={to} placeholder="to" onChange={(e) => setTo(e.currentTarget.value)}/>
            </div>
            <div>

            </div>
            <button onClick={(e)=>{
                e.preventDefault
                try{
                    props.handleAdd(from,to,msg,props.data._id)
                }
                catch{
                    props.handleAdd(from,to,msg);
                }}}> 
                Add
                
            </button>
        </div>
    )
}

export default Noticeboard;