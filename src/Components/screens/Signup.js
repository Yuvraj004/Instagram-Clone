import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css'

const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  let navigate = useNavigate();
  const PostData = async () => {
    await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name:name, email:email, password:password })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html:data.error,classes:"#c62828 red darken-3"})
      }
      else{
        M.toast({html:data.message,classes:"#43a047 green darken-1"})
        navigate("/login");
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <>
      <div className='mycard'>
        <div className="card auth-card">
          <h2>Instagram</h2>
          <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              PostData()
            }}}/>
          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => PostData()}>Signup
          </button>
          <h5>
            <Link to="/login" >Already have an account </Link>
          </h5>
        </div>
      </div>
    </>
  )
}


export default Signup