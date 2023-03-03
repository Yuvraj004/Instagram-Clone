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
      <div className='container'>
        <div className="signup-box">
          <h2 className='loginh2'>Instagram</h2>
          <input  className='logininput' type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className='logininput' type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className='logininput' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              PostData()
            }}}/>
          <button className="buttonlog" type="submit" name="action" onClick={() => PostData()}>Signup
          </button>
          <h5>
            <Link to="/login" className="buttonlog" >Already have an account </Link>
          </h5>
        </div>
      </div>
    </>
  )
}


export default Signup