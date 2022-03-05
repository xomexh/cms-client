import React,{useState,useEffect} from 'react';
import axios from 'axios';

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

    const handleAdd=(from,to,msg)=>{
        axios.post('http://localhost:3000/messages', {
            from: from,
            to: to,
            message:msg
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
            {notices.map((notice => (
                <Notice key={notice._id} data={notice} handleDelete={handleDelete} />
            )))}

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
            Id: {notice._id}
            from: {notice.from}
            to:{notice.to}

            {notice.message}

            date:{notice.date}

            <button onClick={(e)=>{
                e.preventDefault();
                props.handleDelete(notice._id)}}
                >
                Delete
            </button>
            
        </div>
    )
}

const AddNotice=(props)=>{
    const [msg,setMsg]=useState('')
    const [from,setFrom]=useState('')
    const [to,setTo]=useState('')

    

    return(
        <div>
            Add notice here
            <div>
                <input type="text" value={msg} onChange={(e) => setMsg(e.currentTarget.value)}/>
                <input type="text" value={from} onChange={(e) => setFrom(e.currentTarget.value)}/>
                <input type="text" value={to} onChange={(e) => setTo(e.currentTarget.value)}/>
            </div>
            <div>

            </div>
            <button onClick={(e)=>{
                e.preventDefault
                props.handleAdd(from,to,msg);}}/>
        </div>
    )
}

export default Noticeboard;