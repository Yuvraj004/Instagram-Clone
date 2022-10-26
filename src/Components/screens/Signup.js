import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css'

const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  let navigate = useNavigate();
  const PostData = async () => {
    const respons = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name:name, email:email, password:password })
    })
    const json = await respons.json();
    console.log(json);
    if (json.success) {
      //save the token and redirect
      // props.showAlert("You are logged in","success");
      // localStorage.setItem('token',json.authtoken);
      M.toast({ html: 'Success!', classes: 'rounded' });
      navigate("/profile");
    }
    else {
      // props.showAlert("Invalid credentials","danger");
      M.toast({ html: 'Invalid credentials!', classes: 'rounded' });
    }
  }

  return (
    <>
      <div className='mycard'>
        <div className="card auth-card">
          <h2>Instagram</h2>
          <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => PostData()}>Signup
          </button>
          <h5>
            <Link to="signin" >Already have an account </Link>
          </h5>
        </div>
      </div>
    </>
  )
}


export default Signup