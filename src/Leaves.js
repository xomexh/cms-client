import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useParams,useNavigate } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    Button,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
// import DoneIcon from '@mui/icons-material/Done';
import DoneIcon from '@material-ui/icons/Done'

 const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: 950
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  }
}));

const Leaves=()=>{

    const classes=useStyles();
    const[leaves,setLeaves]=useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [btn,setBtn]=useState(true)

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    let {name} = useParams();

    useEffect(()=>{
        const promise = axios.get(`http://localhost:3000/leaves/${name}`)
        promise.then((response)=>{
            console.log(response.data)
            setLeaves(response.data)
        }).catch(error=>console.log(error))
    },[btn])


    const handleApprove=(username)=>{
      const promise = axios.post(`http://localhost:3000/leaves`,{
        uname:username,
        status:"approved"
      })

      promise.then(response=>console.log(response)).catch(err=>console.log(err))
      setBtn(prevState=>!prevState)
    }

    const handleDecline=(username)=>{
      const promise = axios.post(`http://localhost:3000/leaves`,{
        uname:username,
        status:"declined"
      })

      promise.then(response=>console.log(response)).catch(err=>console.log(err))
      setBtn(prevState=>!prevState)
    }
    return(
        <div>
          <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Username</TableCell>
            <TableCell className={classes.tableHeaderCell}>Type of Leave</TableCell>
            <TableCell className={classes.tableHeaderCell}>Request</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.uname}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.name} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.uname}</Typography>
                          {/* <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.phone}</Typography> */}
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.typeOfLeave}</Typography>
                  <Typography color="textSecondary" variant="body2">{row.reason}</Typography>
                </TableCell>
              <TableCell>{row.request}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'approved' && 'green') ||
                        (row.status === 'pending' && 'blue') ||
                        (row.status === 'declined' && 'orange'))
                    }}
                  >{row.status}</Typography>
                </TableCell>
                <TableCell>
                <IconButton aria-label="delete" onClick={(e)=>{
                  e.preventDefault();
                  handleDecline(row.uname)
                }}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="done" color="primary" onClick={(e)=>{
                  e.preventDefault();
                  handleApprove(row.uname)}}>
                  <DoneIcon/>
                </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={leaves.length}
            rowsPerPage={rowsPerPage}
            page={page}
            // onChangePage={handleChangePage}
            onPageChange={handleChangePage}
            //onChangeRowsPerPage={handleChangeRowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
        </div>
    )
}


export default Leaves