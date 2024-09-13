import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EvaluationTopics() {

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

  
const [evaluateTopics, setEvaluateTopics] = useState([])
const [loading, setLoading] = useState(false);
const [posts, setPosts] = useState([]);
const [searchGroupno, setSearchGroupno] = useState("");

useEffect(() => {
  const loadPosts = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/api/sendFeedback");
    setPosts(response.data);
    setLoading(false);
  };
  loadPosts();
}, []);


useEffect(() => {
   function getServices() {
     axios.get(`http://localhost:5000/api/sendFeedback`).then((res) => {
        setEvaluateTopics(res.data)
       //console.log(res.data)   
     }).catch((err) => {
       alert(err)
     })
   }
   getServices();
 }, [evaluateTopics])


  return (
<>
    <br/>
    <br/>
    <br/>
    <br/>
    <hr />
            <center>
            <h1>Evaluations of Topics</h1>
           </center>
           
            <hr />
            <br/>
            <input className="search1"
                style={{ width: "10%", height: "30px" }}
                type="text"
                placeholder=" Group No"
                onChange={(e) => setSearchGroupno(e.target.value)} />
              
              <br/>
    <TableContainer >
        <br/>
      <Table sx={{minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Group ID</StyledTableCell>
            <StyledTableCell align="center">Topic</StyledTableCell>
            <StyledTableCell align="center">Supervisor</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Feedback</StyledTableCell>
          </TableRow>
        </TableHead>
        {loading ? (
                            <button class="btn-btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aris-hidden="true"></span>
                                Loading </button>
                        ) : (
                            posts
                                .filter((value) => {
                                    if (searchGroupno === "") {
                                        return value;
                                    }else if(value.groupno?.toLowerCase().includes(searchGroupno.toLowerCase())){
                                    
                                        return value;
                                    }

                                   
                                }).map((evaluateTopics) =>
     
                                <TableBody>
       
            
              <StyledTableCell align="center">{evaluateTopics.groupno}</StyledTableCell>
              <StyledTableCell align="center">{evaluateTopics.topic}</StyledTableCell>
              <StyledTableCell align="center">{evaluateTopics.supervisor}</StyledTableCell>
              <StyledTableCell align="center">{evaluateTopics.status}</StyledTableCell>
              <StyledTableCell align="center">{evaluateTopics.feedback}</StyledTableCell>
           
          
          
        </TableBody>
           )
           )}
      </Table>
      {/* </center> */}
    </TableContainer>

    
    </>
  );
}
