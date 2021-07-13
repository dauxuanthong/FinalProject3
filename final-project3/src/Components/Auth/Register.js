import React,{useState, useEffect} from "react";
import "../../css/Register.css";
import userAPI from "../../API/userAPI"

function Register(props) {
  //STATE
  const [form, setForm] = useState(
    {
      username:"",
      email:"",
      password:"",
    }
  );
  const [confirmPassword, setConfirmPassword]=useState("");
  const [btStatus, setBtnStatus]=useState(true);

  //USE EFFECT
  useEffect(()=>{
    const checkDisabledBt = ()=>{
      form.password === confirmPassword ? (
        setBtnStatus(false)
      ):(
        setBtnStatus(true)
      )
    };
    checkDisabledBt();
  }, [confirmPassword],[form.password]);

  //FUNCTION
  const register = async (payload)=>{
    try {
      const registerRes = await userAPI.register(payload);
      console.log(registerRes);
    } catch (error) {
      console.log("!!!Error at register() function: ", error);
    }
  };


  const formOnchange = (e)=>{
    //username
    e.target.name === "username" && setForm({
      username: e.target.value,
      email: form.email,
      password: form.password,
    });
    //email
    e.target.name === "email" && setForm({
      username: form.username,
      email: e.target.value,
      password: form.password,
    });
    //password
    e.target.name === "password" && setForm({
      username: form.username,
      email: form.email,
      password: e.target.value,
    });
    //confirm password
    e.target.name === "confirmPassword" && setConfirmPassword(e.target.value);
  };

  const onSubmit = (e)=>{
    e.preventDefault();
    register(form);
    setForm({
      username:"",
      email:"",
      password:"",
    })
    setConfirmPassword("")
  };
    /* #9CECFF #BA9FE7 */
    /*  #71b7e6, #9b59b6 */
  return (
    <div className="register">
      <div className="container">
        <div className="title">Registration</div>
        <form onSubmit={onSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">User name</span>
              <input
                required 
                type="text" 
                name="username" 
                onChange={formOnchange} 
                value={form.username} 
                placeholder="Enter your user name"></input>
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                required 
                type="text" 
                name="email" 
                onChange={formOnchange} 
                value={form.email} 
                placeholder="Enter your email"></input>
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                required 
                type="password" 
                name="password" 
                onChange={formOnchange} 
                value={form.password} 
                placeholder="Enter your password"></input>
            </div>
            <div className="input-box">
              <span className="details">Confirm password</span>
              <input
                required 
                type="password" 
                name="confirmPassword"
                onChange={formOnchange} 
                value={confirmPassword} 
                placeholder="Enter your password"></input>
            </div>
          </div>
          <div className="button">
            <button 
              type="submit" 
              value="Submit"
              disabled={btStatus}>
                Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
