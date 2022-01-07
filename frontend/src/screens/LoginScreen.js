import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

//Styling
import "../App.css";

//Components
import MainScreen from "../components/MainScreen";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Form, Button, Col, Row } from "react-bootstrap";

const LoginScreen = () => {
  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Redux utilised for managing state.
  const dispatch = useDispatch();

  //useSelector in order to access the state.
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  /*This in conjunction with the useEffect below, will push the user to the 
  'mytodos' page. */
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mytodos");
    }
  }, [navigate, userInfo]);

  /*e.preventDefault() will prevent the page from reloading when the submit button
  is clicked. */
  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ? <Link to="/register" className="register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
