import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodoAction } from "../actions/todosActions";

//Components
import MainScreen from "../components/MainScreen";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Button, Card, Form } from "react-bootstrap";

function CreateTodo() {
  const [item, setItem] = useState("");

  const dispatch = useDispatch();

  const todoCreate = useSelector((state) => state.todoCreate);
  const { loading, error, todo } = todoCreate;

  console.log(todo);

  //When the reset button is clicked, it will empty the state.
  const resetHandler = () => {
    setItem("");
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!item) return;
    dispatch(createTodoAction(item));

    resetHandler();
    navigate("/mytodos");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Todo">
      <Card>
        <Card.Header>Create a new Todo</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                value={item}
                placeholder="Enter the item"
                onChange={(e) => setItem(e.target.value)}
              />
            </Form.Group>

            <br />
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Todo
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feild
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default CreateTodo;
