import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Styling
import "../App.css";

//Components
import { Button, Container, Row } from "react-bootstrap";

const LandingPage = () => {
  /* Check to see if there is something in local storage. If the user is logged in, it
  will push the user to the /mytodos page. */
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/mytodos");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to the To-Do App</h1>
              <p className="subtitle">One place for all your to-dos.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
