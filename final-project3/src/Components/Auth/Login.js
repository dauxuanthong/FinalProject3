import React, { useState } from "react";
import "../../css/Login.css";
import userAPI from "../../API/userAPI";
import { GoogleLogin } from "react-google-login";

function Login(props) {
  //STATE
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  //Function
  const login = async (payload) => {
    try {
      const loginRes = await userAPI.login(payload);
      if (loginRes.message === "SUCCESS") {
        const createTokenRes = await userAPI.createToken(loginRes);
        localStorage.setItem("accessToken", JSON.stringify(createTokenRes));
        window.location = "/";
      } else {
        console.log("Error warning");
      }
    } catch (error) {
      console.log("!!!Error at login function: ", error);
    }
  };

  const formOnchange = (e) => {
    e.target.name === "username" &&
      setForm({
        username: e.target.value,
        password: form.password,
      });
    e.target.name === "password" &&
      setForm({
        username: form.username,
        password: e.target.value,
      });
  };

  const handleLogin = async (googleData) => {
    try {
      const res = await userAPI.googleLogin({ token: googleData.tokenId });
      if (res.message === "SUCCESS") {
        const createTokenRes = await userAPI.createToken(res);
        localStorage.setItem("accessToken", JSON.stringify(createTokenRes));
        window.location = "/";
      } else {
        console.log("Error warning");
      }
      console.log("USER: ", res);
    } catch (error) {
      console.log("!!!Error at handleLogin function: ", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(form);
    setForm({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login">
      <div className="container">
        <div className="title">Login</div>
        <form onSubmit={onSubmit}>
          <div className="login-detail">
            <div className="input-box">
              <input
                required
                type="text"
                name="username"
                onChange={formOnchange}
                value={form.username}
              ></input>
              <span></span>
              <label className="details">User Name</label>
            </div>
            <div className="input-box">
              <input
                required
                type="password"
                name="password"
                onChange={formOnchange}
                value={form.password}
              ></input>
              <span></span>
              <label className="details">Password</label>
            </div>
          </div>
          <div className="button">
            <button type="submit" value="submit">
              Login
            </button>
          </div>
          <div className="google-login">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
