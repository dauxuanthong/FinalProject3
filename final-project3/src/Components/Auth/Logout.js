import React from "react";
import Cookies from 'js-cookie';
import userAPI from "../../API/userAPI";
function Logout(props) {
  //STATE
  //Function
  const logout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const response = await userAPI.logOut(user);
      if(response === "OK"){
        //remove cookie
        Cookies.remove("refreshToken");
        //clear session
        localStorage.clear();
        window.location = "/";
      }
      console.log("ERROR MESSAGE");
    } catch (error) {
      return console.log("!!!Error at logout function: ", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button type="submit">LOGOUT</button>
      </form>
    </div>
  );
}

export default Logout;
