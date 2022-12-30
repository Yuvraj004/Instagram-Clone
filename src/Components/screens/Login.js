import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  UserContext } from '../../App';
import M from 'materialize-css'
const Login = () => {
  const {dispatch}=useContext(UserContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const CheckData = async() => {
    let response =await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const json =await response.json();
        if(json.success){
          M.toast({html:"GOTCHA",classes:"#43a047 green darken-3"});
            //save the token and redirect
            // props.showAlert("You are logged in","success");
          localStorage.setItem('token',json.token);
          localStorage.setItem('user',JSON.stringify(json.user));
          dispatch(({type:"USER",payload:json.user}))
          navigate("/profile");
          
        }
        else{
          M.toast({html:"Retry Please",classes:"#c62828 red darken-3"});
        }
  }

  return (
    <>
      <div className='mycard'>
        <div className="card auth-card">
          <h2>Instagram</h2>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => CheckData()}>Login
          </button>
          <h5>
            <Link to="signup">Don't have an account </Link>
          </h5>
        </div>
      </div>
    </>
  )
}

export default Login