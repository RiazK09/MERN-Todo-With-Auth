import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Stylesheet
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyTodos from "./screens/MyTodos";
import CreateTodo from "./screens/CreateTodo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/createtodo" element={<CreateTodo />} />
            <Route path="/mytodos" element={<MyTodos />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
