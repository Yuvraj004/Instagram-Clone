import React, { useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import M from 'materialize-css';
const NewPass = () => {
  let navigate = useNavigate();
  const [password, setPassword] = useState("")
  const {token} =useParams()
  console.log(token)
  const CheckData = async () => {
    let response = await fetch('/new-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  password,token })
    })
    const json = await response.json();
    if (json) {
      M.toast({ html: "GOTCHA", classes: "#43a047 green darken-3" });
      //save the token and redirect
      // props.showAlert("You are logged in","success");
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
          <input className='logininput' type="password" placeholder="Enter a new password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              CheckData()
            }}} />
          <button className=" buttonlog" type="submit" name="action" onClick={() => CheckData()}>Update Password
          </button>

        </div>
      </div>
    </>
  )
}

export default NewPass

