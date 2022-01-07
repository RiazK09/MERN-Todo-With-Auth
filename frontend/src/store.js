import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  todoCreateReducer,
  todoDeleteReducer,
  todoListReducer,
} from "./reducers/todosReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

//This will contain all my reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  todoList: todoListReducer,
  todoCreate: todoCreateReducer,
  todoDelete: todoDeleteReducer,
});

/* Fetch user state from localStorage - so that whenever a user comes back, it will 
fetch all of their data from the localStorage. */
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
