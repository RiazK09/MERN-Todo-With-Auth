import axios from "axios";
import {
  TODOS_CREATE_FAIL,
  TODOS_CREATE_REQUEST,
  TODOS_CREATE_SUCCESS,
  TODOS_DELETE_FAIL,
  TODOS_DELETE_REQUEST,
  TODOS_DELETE_SUCCESS,
  TODOS_LIST_FAIL,
  TODOS_LIST_REQUEST,
  TODOS_LIST_SUCCESS,
} from "../constants/todosConstants";

//Action for Listing the Todos
export const listTodos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODOS_LIST_REQUEST,
    });

    //This will fetch the user info from the state.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/todos`, config);

    dispatch({
      type: TODOS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TODOS_LIST_FAIL,
      payload: message,
    });
  }
};

//Action for Creating the Todos
export const createTodoAction = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODOS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/todos/create`, { item }, config);

    dispatch({
      type: TODOS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TODOS_CREATE_FAIL,
      payload: message,
    });
  }
};

//Action for Deleting the Todos
export const deleteTodoAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODOS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/todos/${id}`, config);

    dispatch({
      type: TODOS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TODOS_DELETE_FAIL,
      payload: message,
    });
  }
};
