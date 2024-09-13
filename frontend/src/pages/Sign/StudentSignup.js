import React from "react";
import { Link } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import { useState } from "react";
import axois from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentSignup = () => {

  const navigate = useNavigate();

  const [studentID, setstudentID] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [password, setpassword] = useState("");


  const sendData = async (e) => {
    e.preventDefault();

    if (!studentID || !name || !email || !contactNumber || !password) {
      alert("Please fill  in all  fields");
      return;
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Invalid email");
      return;
    } else if (contactNumber.trim().length != 10) {
      alert("Invalid phoneno");
      return;
    }
 
    const newStudent = {
      studentID,
      name,
      email,
      contactNumber,
      password,
    };

    await axois
      .post("http://localhost:5000/api/auth/registerstudent", newStudent)
      .then((res) => {
        alert("Registration Success");
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        setstudentID("");
        setname("");
        setemail("");
        setcontactNumber("");
        setpassword("");
        navigate(`/`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            {" "}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Image src="#" fluid />
          </Col>
          <Col>
            {" "}
            <Form className="container" onSubmit={sendData}>
              <div className="signin1">
                <div className="signin">
                  <Col xs={1} md={12}>
                    <Image
                      className="im"
                      src="https://res.cloudinary.com/hidl3r/image/upload/v1631611510/itp/ulogin_b64etx.png"
                      roundedCircle
                    />
                    <br />
                    <br />
                  </Col>

                  <h1 className="login">Student Sign Up</h1>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter ID"
                      value={studentID}
                      onChange={(e) => setstudentID(e.target.value)}
                    />
                  </Form.Group>
                  <br />

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </Form.Group>

                  <br />
                  <Form.Group className="mb-3" controlId="formBasicPhoneno">
                    <Form.Control
                      type="email"
                      required
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </Form.Group>
                  <br />

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="number"
                      required
                      placeholder="Contact Number"
                      maxlength="10"
                      value={contactNumber}
                      onChange={(e) => setcontactNumber(e.target.value)}
                    />
                  </Form.Group>

                  <br />
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </Form.Group>
                  <br />

                  <Button variant="primary" size="lg" type="submit">
                    Sign Up
                  </Button>

                  <br />
                  <br />
                  <h5>
                    <Link to="/studentsignin">Already have an account? </Link>
                  </h5>
                  <br />
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentSignup;
