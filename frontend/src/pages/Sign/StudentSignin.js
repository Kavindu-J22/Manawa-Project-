import React from "react";
import { Link } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axois from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";

const StudentSignin = (props) => {

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      window.location("/");
    }
  }, []);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const sendData = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill  in all  fields");
      return;
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Invalid email");
      return;
    }

    const newStudent = {
      email,
      password,
    };

    await axois
      .post("http://localhost:5000/api/auth/studentlogin", newStudent)
      .then((res) => {
        alert("Login Success");

        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);

        setemail("");
        setpassword("");

        window.location = "/"

      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div style={{"padding-top":"5vh"}}>
      <Container>
        <Row>
          <Col>
            {" "}
            <br />
            <Form className="container" onSubmit={sendData}>
              <div className="signin1">
                <div className="signin">
                  <Col xs={1} md={12}>
                    <Image
                      className="im"
                      src="https://res.cloudinary.com/hidl3r/image/upload/v1631611510/itp/ulogin_b64etx.png"
                      roundedCircle
                    />
                  </Col>
                  <h1 className="login">Student Sign In</h1>
                  <br /> <br />
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <br /> <br />
                  <Button variant="primary" size="lg" type="submit">
                    Sign In
                  </Button>
                  <br />
                  <br />
                  <br />
                  <h5>
                    <Link to="/studentsignup" id="link">
                      {" "}
                      Don't have an account?{" "}
                    </Link>
                  </h5>
                </div>
              </div>
            </Form>
          </Col>
          <Col>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Image src="#" fluid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentSignin;
