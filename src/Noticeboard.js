import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';


import Accordion from 'react-bootstrap/Accordion'
import Badge from 'react-bootstrap/Badge'

import '../styles/noticeboard.css'

const Noticeboard = ()=>{
    const [notices,setNotices]=useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [filteredNotice,setFilteredNotice]=useState([])
    const [lol,setlol]=useState(false)

    useEffect(()=>{
        const promise = axios.get('http://localhost:3000/messages/all')
        promise.then((response)=>{
            console.log(response)
            setNotices(response.data)
            setLoading(false)
            setFilteredNotice(response.data)
        })
        console.log('eita use effect')
    },[lol])

    const handleDelete =(id)=>{
        const original = notices;
        console.log('eithi')
        const changed= original.filter((change)=> change._id !== id)
        setNotices(changed)
        axios.delete(`http://localhost:3000/messages/${id}`).then((response)=>{
            console.log(response)
        })
        console.log(id)
        setlol(prevState=>!prevState)
    }

    const handleAdd=(title,from,to,msg,id)=>{
        axios.post('http://localhost:3000/messages', {
            title:title,
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
            setFilteredNotice(response.data)
        })
        });
    }

    const handleFilter=(event)=>{
        const searchWord=event.target.value;
        const newFilter=notices.filter((value)=>{
            return value.title.toLowerCase().includes(searchWord.toLowerCase())
        });
        console.log(newFilter)
        setFilteredNotice(newFilter)
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = notices.slice(indexOfFirstPost, indexOfLastPost);
    const currentPosts = filteredNotice.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return(
        <div className='notice-box'>
            <h1>Notice Board</h1>
            <div>
                {/* <input type="text" placeholder='search notices' onChange={handleFilter}/> */}
                <div class="card-body row no-gutters align-items-center">
                    <div class="col-auto">
                        <i class="fas fa-search h4 text-body"></i>
                    </div>
                                    
                    <div class="col">
                        <input class="form-control form-control-lg form-control-borderless" type="text" placeholder="Search topics or keywords" onChange={handleFilter}/>
                    </div>
                                    
                    <div class="col-auto">
                         <button class="btn btn-lg btn-success" type="submit">Search</button>
                    </div>
                                    
                </div>
            {currentPosts.map((notice => (
                <Notice key={notice._id} data={notice} handleDelete={handleDelete} handleAdd={handleAdd}/>
            )))}
            </div>
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={notices.length}
            paginate={paginate}
             />

            <AddNotice handleAdd={handleAdd}/>
        </div>
    )
}

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href='#' className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

const Notice = (props)=>{
    const [notice,setNotice]=useState([]);

    useEffect(()=>{
        console.log(props.data)
        setNotice(props.data)
    },[])
    return(
        <div className='acc-items'>
            <Accordion >
                <Accordion.Item eventKey={notice.id}>
                <Accordion.Header>
                    {notice.title}
                    <div className='funny' alig>
                        <Badge bg="secondary">{notice.from}</Badge>
                    </div>
                    <div className='funny-2' alig>
                        <Badge bg="secondary">{notice.to}</Badge>
                    </div>

                    
                </Accordion.Header>
                <Accordion.Body>{notice.message}<br/>
                {/* From: {notice.from}
                To:{notice.to} */}
                <br/>

                <button onClick={(e)=>{
                    e.preventDefault();
                    props.handleDelete(notice._id)}}
                    className="btn btn-danger"
                    >Delete
                </button>

                {/* <button onClick={(e)=>{
                    e.preventDefault();
                    //ReactDOM.render(<AddNotice data={notice} handleAdd={props.handleAdd} />, document.getElementById('sandy'));
                    }}
                    className="btn btn-warning"
                    >Update
                </button> */}
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* Id: {notice._id}<br></br>
            from: {notice.from}<br></br>
            to:{notice.to}<br></br>

            message: {notice.message}<br></br>

            date:{notice.date}<br></br> */}

            {/* <button onClick={(e)=>{
                e.preventDefault();
                props.handleDelete(notice._id)}}>Delete
            </button>

            <button onClick={(e)=>{
                e.preventDefault();
                //ReactDOM.render(<AddNotice data={notice} handleAdd={props.handleAdd} />, document.getElementById('sandy'));
            }}>Update
            </button> */}

        </div>
    )
}

const AddNotice=(props)=>{
    const [msg,setMsg]=useState('')
    const [from,setFrom]=useState('')
    const [to,setTo]=useState('')
    const [title,setTitle]=useState('')

    useEffect(()=>{
        const user=jwtDecode(localStorage.getItem("token"))
        try{
            setMsg(props.data.message)
            setFrom(user.user.uname)
            setTo(props.data.to)
            console.log(props.data)
        }
        catch{
            setFrom(user.user.uname)
            console.log("catch block")
        }
    },[])

    return(
        <div>
            <h3>Add notice here</h3>
            <div className='input-notice'>
                {/* <input className='input-group input-group-sm mb-3' type="text" value={msg} placeholder="message" onChange={(e) => setMsg(e.currentTarget.value)}/>
                <input type="text" value={from} placeholder="from" onChange={(e) => setFrom(e.currentTarget.value)}/>
                <input type="text" value={to} placeholder="to" onChange={(e) => setTo(e.currentTarget.value)}/> */}
                <div class="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setTitle(e.currentTarget.value)}/>
                </div>

                <div class="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Notice</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setMsg(e.currentTarget.value)}/>
                </div>

                

                {/* <div class="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">From</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setFrom(e.currentTarget.value)}/>
                </div> */}

                <div class="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">To</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setTo(e.currentTarget.value)}/>
                </div>


            </div>
            <button onClick={(e)=>{
                e.preventDefault
                try{
                    props.handleAdd(title,from,to,msg,props.data._id)
                }
                catch{
                    props.handleAdd(title,from,to,msg);
                }}} class="btn btn-success"> 
                Add
                
            </button>
            
        </div>
    )
}

export default Noticeboard;