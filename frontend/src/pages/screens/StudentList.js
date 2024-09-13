import React, {useState,useEffect} from "react";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const StudentList = (props) => {
   
    let navigate = useNavigate();

    const [student, setStudent] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() =>{


        function getStudent(){
            axios.get("http://localhost:5000/api/student/allprofiles").then((res) =>{
                setStudent(res.data);
            }).catch((err) => {
                alert(err.message);
            })
     }
       getStudent();
       },[]) 

       function Update(studentID) {
        console.log(studentID)
        navigate("/studentprofile/"+studentID);
    }
  
      return(
        <div> 

       <br/><br/><br/>
       <center> <h1> Student List </h1> </center>
        <br/>

        <Table striped bordered hover variant="dark">
  <thead>
  <input type="text" placeholder = "Search " onChange ={(e) =>{
  setSearch(e.target.value);
}} />
    <tr>
      <th scope="col"> Student id</th>
      <th scope="col"> Name</th>
      <th scope="col"> Email </th>
      <th scope="col">Contact Number</th>
    
    </tr>
  </thead>
  <tbody>

  {student.filter(Student => {
                          if(search == ""){
                              return Student
                          }
                          else if(Student.studentID.toLowerCase().includes(search.toLowerCase())){
                              return Student
                          }
                      }).
    
    
  map((Student) => {

    return(
      <tr key={Student.staffID}>
      
      <td> <Button variant="outline-primary" onClick={()=>Update(Student.studentID)}>{Student.studentID}</Button></td>
      <td>{Student.name}</td>
      <td>{Student.email}</td>
      <td>{Student.contactNumber}</td>
     
    </tr>
    );
    })} 

   
    </tbody>
</Table>


       </div>
     )  
   
  }
  
  export default StudentList


