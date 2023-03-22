import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
const Login = () => {
  const { dispatch } = useContext(UserContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const CheckData = async () => {
    console.log("login reached")
    await fetch('https://ussinstaclonebackend.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res=>res.json())
    .then(jsond => {
      console.log("worked")
      M.toast({ html: "GOTCHA", classes: "#43a047 green darken-3" });
      //save the token and redirect
      windows.alert("You are logged in");
      localStorage.setItem('token', jsond.token);
      localStorage.setItem('user', JSON.stringify(jsond.user));
      dispatch(({ type: "USER", payload: jsond.user }))
      navigate("/profile");

    })
    .catch(err=>{
      console.error(err)
      M.toast({ html: "Retry Please", classes: "#c62828 red darken-3" });
    })
  }

  return (
    <>
      <div className='container'>
        <div className="login-box shadow">
          <h2 className='loginh2'>Instagram</h2>
          <input className='logininput' type="text" placeholder="email" value={email} onChange={(e) => {setEmail(e.target.value);localStorage.setItem('password',e.target.value)}} />
          <input className='logininput' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              CheckData()
            }}} />
          <button className=" buttonlog" type="submit" name="action" onClick={() => CheckData()}>Login
          </button>
          
          <h5 style={{marginTop:"0.625rem"}}>
            <Link to="/signup" className=" buttonlog" >Don't have an account </Link>
          </h5>
          <h6 style={{margin:"1.625rem"}}>
            <Link to="/reset" className=" buttonlog">Forgot Password </Link>
          </h6>
        </div>
      </div>
    </>
  )
}

export default Login