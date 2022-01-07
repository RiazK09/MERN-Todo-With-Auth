import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTodos, deleteTodoAction } from "../actions/todosActions";

//Components
import MainScreen from "../components/MainScreen";
import { Button, Card } from "react-bootstrap";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MyTodos = () => {
  //Redux
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todoList);
  const { loading, error, todos } = todoList;

  //Login State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //State for Creating Todos
  const todoCreate = useSelector((state) => state.todoCreate);
  const { success: successCreate } = todoCreate;

  //State for Deleting Todos
  const todoDelete = useSelector((state) => state.todoDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = todoDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodoAction(id));
    }
  };

  console.log(todos);

  /*If the user is not logged in, this in conjunction with the useEffect below, 
  will push the user to the home page. */
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listTodos());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successCreate, successDelete]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}...`}>
      <Link to="/createtodo">
        <Button style={{ marginLeft: 10, marginBotton: 6 }} size="lg">
          Add New Todo
        </Button>
      </Link>
      {/*Error and Loading for deleting a Todo */}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}

      {/*Error and Loading for displaying the Todo List */}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      {/* reverse() will add my latest todo, to the top of the todo list! */}
      {todos?.reverse().map((todo) => (
        <Card style={{ margin: 10 }} key={todo._id}>
          <Card.Header style={{ display: "flex" }}>
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 18,
              }}
            >
              {todo.item}
            </span>
            <div>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => deleteHandler(todo._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Header>
        </Card>
      ))}
    </MainScreen>
  );
};

export default MyTodos;
