import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Figure } from "react-bootstrap";
import UserPool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const dynamoAPI = process.env.REACT_APP_DYNAMO_API;
const headers = {
  "Content-Type": "application/json",
};

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: state.email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: state.email,
      Password: state.password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
        console.log("onSuccess: ", data);
        localStorage.setItem("id", state.email);
        navigate("/");
      },
      onFailure: (err) => {
        console.log(err);
        alert("Email not verified or Credentials incorrect")
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };

  return (
    <div>
      <Container>
        <Row style={{ display: "flex" }}>
          <Col sm={7}>
            <Figure>
              <Figure.Image
                src="https://c0.wallpaperflare.com/preview/450/707/805/gavel-auction-hammer-justice.jpg"
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
            sm={3}
            style={{
              textAlign: "start",
              paddingTop: "2cm",
              alignContent: "left",
              paddingLeft: "2cm",
              paddingBlock: "3cm",
            }}
          >
            <h2>Login</h2>
            <Form
              style={{
                paddingTop: "1cm",
              }}
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
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

export default Login;
