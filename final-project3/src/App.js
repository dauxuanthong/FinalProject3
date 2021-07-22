import React, { useState, useEffect } from "react";
import './css/App.css';
import userAPI from "./API/userAPI"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Layout/NavBar/NavBar"
import Login from "./Components/Auth/Login"
import Register from "./Components/Auth/Register"
import FormUpLoad from "./Components/Post/FormUpLoad";
import "bootstrap/dist/css/bootstrap.min.css";
import TestForm from "./Components/Post/TestForm"
import AnotherTest from "./Components/Post/AnotherTest"
import Upload from "./Components/Post/Upload";

function App() {
  //STATE
  const [updateTK, setUpdateTK] = useState({
    value: 1,
  });
  //EFFECT
  useEffect(()=>{
    refresh();
    setTimeout(() => {
      if (updateTK.value === 1) {
        setUpdateTK({
          value: 2,
        });
      } else {
        setUpdateTK({
          value: 1,
        });
      }
    }, 600000); // 10 minutes
  }, [updateTK]);

  //Function
  const refresh = async ()=>{
    const newToken = await userAPI.refreshToken();
    localStorage.setItem("accessToken", JSON.stringify(newToken));
  }


  return (
    <Router>
      <Route exact path="/" component={Navbar} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/upload" component={FormUpLoad} />
      <Route exact path="/testUpload" component={TestForm} />
      <Route exact path="/test2" component={AnotherTest} />
      <Route exact path="/test3" component={Upload} />
    </Router>
  );
}
  
export default App;
