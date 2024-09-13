import React from "react";
import {Link} from 'react-router-dom'
import {Col,Image} from "react-bootstrap";
import { useState} from 'react';
import axois from "axios";
import{Form,Button,Container,Row,FloatingLabel} from "react-bootstrap";


const StaffSignup = () => {
   
      const [staffID, setstaffID] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [role, setrole] = useState("");
    const [researchfield, setresearchfield] = useState("");
    const [password, setpassword] = useState("");
    
    function sendData(e) {

        if(!staffID || !name || !email || !researchfield || !password){
            alert("Please fill  in all  fields");
            return
        } 

        
        else  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert("Invalid email");
             return
         }


        e.preventDefault();
        
        const newStaff ={

            staffID,
            name,
            email,
            role,
            researchfield,
            password
    
        }
         console.log(newStaff)  


         axois.post("http://localhost:5000/api/auth/registerstaff", newStaff).then(() => {
             alert("Registration Success");

             window.location = `/staffsignin`;

            setstaffID("");
            setname("");
            setemail("");
            setrole("");
            setresearchfield("");
            setpassword("");


         }).catch((err) =>{
             alert(err)
         })
    }


    return(
        <div> 
            <Container>
  <Row>
    <Col>  <br/><br/><br/><br/><br/><br/><br/><br/><br/>
     <Image src="#" fluid /></Col>
    <Col>  <Form className="container" onSubmit={sendData} >
          <div className = "signin1">
            <div className= "signin">
          <Col xs={1} md={12}  >
                <Image  className="im" src="https://res.cloudinary.com/hidl3r/image/upload/v1631611510/itp/ulogin_b64etx.png" roundedCircle />
                <br/> <br/>
              </Col>
 
                <h1 className="login">Staff Sign Up</h1>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                     <Form.Control type="text" required placeholder="Enter ID"  value = {staffID}
                        onChange={(e) => setstaffID (e.target.value)} />
               </Form.Group>
                <br/>
               
                <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Control type="text" required placeholder="Enter Name"  value = {name}
                        onChange={(e) => setname (e.target.value)} />
     
                </Form.Group>

                <br/>
               <Form.Group className="mb-3" controlId="formBasicPhoneno">
                     <Form.Control type="email" required placeholder="Enter email"  value = {email}
                        onChange={(e) => setemail (e.target.value)} />
     
                     </Form.Group>
                <br/>
                
               <Col sm>
                    <Form.Group controlId="floatingSelectGrid" label="Select">
                    <Form.Select onChange={(e) => setrole (e.target.value)} aria-label="Floating label select example">
                        <option value={role}>supervisor</option>
                        <option value={role}>co-supervisor</option>
                        <option value={role}>pannel-member</option>
                       
                    </Form.Select >
                    </Form.Group>
                </Col>

                <br/>
                <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Control type="researchfield" required placeholder="Research field" value = {researchfield}
                  onChange={(e) => setresearchfield (e.target.value)}/>
               </Form.Group><br/>
 
              <br/>
              <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Control type="password" required placeholder="Password" value = {password}
                  onChange={(e) => setpassword (e.target.value)}/>
               </Form.Group><br/>
       <Button variant="primary" size="lg" type="submit">
           Sign Up
      </Button>
      <br/><br/>
       <h5>
       <Link to = "/staffsignin">Already have an account?  </Link>
      </h5>
      <br/>
               </div>
           </div>
         </Form></Col>
  </Row>
 
</Container>
        
      </div>
   )  
 
}

export default StaffSignup