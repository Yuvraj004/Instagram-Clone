
import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const Signup=()=> {
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const PostData=  async()=>{
    const response=await fetch("http://localhost:5000/api/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    })
    const json=await response.json();
    console.log(json)
  }

  return (
    <>
      <div className='mycard'>
        <div className="card auth-card">
          <h2>Instagram</h2>
          <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>PostData()}>Signup
          </button>
          <h5>
            <Link to="signin">Already have an account </Link>
          </h5>
        </div>
      </div>
    </>
  )
}


export default Signup