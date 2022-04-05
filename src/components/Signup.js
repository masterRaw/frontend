import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Figure } from "react-bootstrap";
import UserPool from '../UserPool'

const dynamoAPI = process.env.REACT_APP_DYNAMO_API;
const headers = {
  'Content-Type': 'application/json'
}

const Signup = () => {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [state, setState] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    address:'',
    phoneNumber:''
  });

  const handleChange =  (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {

    e.preventDefault(); 

    const userinput ={
      email:state.email,
      name:state.name,
      address:state.address,
      phonenumber:state.phoneNumber
    }

    UserPool.signUp(state.email,state.password,[],null,async (err, data) => {
      if(err) {
        console.error(err);
        alert("Please enter valid details")
      }
      const res = await axios.post(dynamoAPI + "signup", userinput, { headers: headers });
      console.log(res)      
      if (res.data.success === true) {
        console.log(res.data);
        navigate("/login");
    }
    });    
  };


  return (
    <div>
      <Container>
        <Row style={{ display: "flex" }}>
          <Col sm={6}>
            <Figure>
              <Figure.Image
                src="https://images.pexels.com/photos/11505601/pexels-photo-11505601.jpeg?cs=srgb&dl=pexels-towfiqu-barbhuiya-11505601.jpg&fm=jpg"
                alt="userprofileimage"
                style={{
                  width: "100%",
                  height: "150%",
                  float: "left",
                  justifyContent: "center",
                  paddingRight: "1cm",
                  paddingBlock: "3cm",
                }}
              />
            </Figure>
          </Col>
          <Col
            sm={4}
            style={{
              textAlign: "start",
              paddingTop: "1cm",
              alignContent: "left",
              paddingLeft: "2cm",
            }}
          >
            <h2>Register</h2>
            <Form
              style={{
                paddingTop: "0.5cm",
              }} onSubmit={handleSubmit}
            >
              <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" name="name" value={state.name} onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={state.email} onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="formGridPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={state.password} onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="formGridPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={state.confirmPassword} onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" name="address" value={state.address} onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="Enter your phone number" name="phoneNumber" value={state.phoneNumber} onChange={handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
