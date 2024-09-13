import React, {useState,useEffect} from "react";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const StaffList = () => {
   
    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() =>{


        function getStaff(){
            axios.get("http://localhost:5000/api/staff/allprofiles").then((res) =>{
                setStaff(res.data);
            }).catch((err) => {
                alert(err.message);
            })
     }
        getStaff();
       },[]) 
  
      return(
        <div> 

       <br/><br/><br/>
       <center> <h1> Research fields and supervisors </h1> </center>
        <br/>

        <Table striped bordered hover variant="dark">
  <thead>
  <input type="text" placeholder = "Search " onChange ={(e) =>{
  setSearch(e.target.value);
}} />
    <tr>
      <th scope="col"> Staff id</th>
      <th scope="col">Member Name</th>
      <th scope="col"> Email </th>
      <th scope="col">Research Field</th>
      <th scope="col">Educational Role</th>
    
    </tr>
  </thead>
  <tbody>

  {staff.filter(Staff => {
                          if(search == ""){
                              return Staff
                          }
                          else if(Staff.researchfield.toLowerCase().includes(search.toLowerCase())){
                              return Staff
                          }
                      }).
    
    
  map((Staff) => {

    return(
      <tr key={Staff.staffID}>
      
      <td> <Button variant="outline-primary" onClick={()=>Update(Staff.staffID)}>{Staff.staffID}</Button></td>
      <td>{Staff.name}</td>
      <td>{Staff.email}</td>
      <td>{Staff.researchfield}</td>
      <td>{Staff.role}</td>
     
    </tr>
    );
    })} 

   
    </tbody>
</Table>


       </div>
     )  
   
  }
  
  export default StaffList


