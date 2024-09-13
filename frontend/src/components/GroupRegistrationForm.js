import React ,{useState} from "react";
import axios from "axios";
import { Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
 import './Submission.css';
export default function GroupRegistrationForm(){  //adding function

    //creating states
  const [studentID1,setstudentID1] = useState("");
  const [studentID2,setstudentID2] = useState("");
  const [studentID3,setstudentID3] = useState("");
  const [studentID4,setstudentID4] = useState("");
  const [field,setfield] = useState("");
  const [supervisorName,setsupervisorName] = useState("");
  const [coSupName,setcoSupName] = useState("");
  const [topic,settopic] = useState("");
 

  function sendData(e){  //create event send data
    
    e.preventDefault(); //execute setData function, when click submit button

      const newGroup ={
        
        studentID1,
        studentID2,
        studentID3,
        studentID4,
        field,
        supervisorName,
        coSupName,
        topic

      }

     axios.post(`http://localhost:5000/api/group/addGroup`, newGroup).then(() =>{  //route from the backend

        alert("Group Added.Mail us for any updates or inqueries- SLIIT Academic Affairs") //display if adding is successful
        window.location = `/`;  //redirect to adding page
     }).catch((err) =>{   //display error if adding is not successful
        alert(err)
     })
  }

    return(
 <div className="container">
   

<br/><br/>

<div className="greg">
   <div className="greg1">
   <Container>

       <blockquote class="blockquote">
 <center><h1 class="mb-0">Group Registration Form</h1></center> 
</blockquote>
       <br></br>
        <Form className="container"  onSubmit={sendData} > 
<div>
<label for="student id"><b>Student IDs</b></label>
<div className="form-group">
    <input type="text" className="form-control" id=" studentID1" aria-describedby="em" placeholder="Enter  Student1 ID"  required
    onChange={(e)=>{
      setstudentID1(e.target.value);
     }}   />
     
  </div>


  <div className="form-group">
    <input type="text" className="form-control" id=" studentID2" aria-describedby="em" placeholder="Enter  Student2 ID"  required
    onChange={(e)=>{
      setstudentID2(e.target.value);
     }}   />
     
  </div>


  <div className="form-group">
    <input type="text" className="form-control" id=" studentID3" aria-describedby="em" placeholder="Enter  Student3 ID"  required
    onChange={(e)=>{
      setstudentID3(e.target.value);
     }}   />
     
  </div>




  <div className="form-group">
    <input type="text" className="form-control" id=" studentID4" aria-describedby="em" placeholder="Enter  Student4 ID"  required
    onChange={(e)=>{
      setstudentID4(e.target.value);
     }}   />
     
  </div>

</div>


<br></br>

<div className="form-group ">
                <i className="zmdi zmdi-email zmdi-hc-2x"></i>
                <label for="  field" className="labels">
                 <b>  Select Resaerch Field *:</b>
                </label>
                <select
                  class="custom-select custom-select-lg mb-3"
                  id=" field"
                  required
                  onChange={(e) => {
                    setfield(e.target.value);
                  }}
                >
                  <option>Choose</option>
                  <option>Software Engineering </option>
                  <option>Information Security</option>
                  <option>AI and Machine Larning</option>
                  <option>ICT for Development</option>
                  <option>Distributed and Parallel Computing</option>
                  <option>Visual Computing</option>
                  <option>Data Science</option>
                  <option>Robotic and Intelligent System</option>
                  <option>Human Computing Interaction</option>
                </select>
              </div>
            

  <br></br>
<div class="form-group">
    <label for="supervisorName"><b>Supervisor Name</b></label>
    <input type="text" class="form-control" id="supervisorName" aria-describedby="em" placeholder="Supervisor Name" required onChange={(e) =>{
     setsupervisorName(e.target.value);
     }}  />
     
  </div>

  <br/>
  <div class="form-group">
    <label for="topic"><b>Topic</b></label>
    <input type="text" class="form-control" id="topic" aria-describedby="em" placeholder="Enter Topic" required onChange={(e) =>{
     settopic(e.target.value);
     }}  />
     
  </div>
 
  
  <br/>
  <div className="d-grid gap-2">
  <Button variant="primary" size="lg" type="submit">
  Submit
  </Button>
  </div>
    
   
 
    
        
</Form>

</Container>
</div>
</div>
</div>
    );
}