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
    let response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json();
    if (json.success) {
      M.toast({ html: "GOTCHA", classes: "#43a047 green darken-3" });
      //save the token and redirect
      // props.showAlert("You are logged in","success");
      localStorage.setItem('token', json.token);
      localStorage.setItem('user', JSON.stringify(json.user));
      dispatch(({ type: "USER", payload: json.user }))
      navigate("/profile");

    }
    else {
      M.toast({ html: "Retry Please", classes: "#c62828 red darken-3" });
    }
  }

  return (
    <>
      <div className='container'>
        <div className="login-box shadow">
          <h2 className='loginh2'>Instagram</h2>
          <input className='logininput' type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className='logininput' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              CheckData()
            }}} />
          <button className=" buttonlog" type="submit" name="action" onClick={() => CheckData()}>Login
          </button>
          <h5>
            <Link to="signup" className="buttonlog">Don't have an account </Link>
          </h5>
        </div>
      </div>
    </>
  )
}

export default Login