import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
const Login=()=> {
  let navigate =useNavigate();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const CheckData=async()=>{
    const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password}) 
        });
        const json =await response.json();
        console.log(json);
        if(json.success){
            //save the token and redirect
            // props.showAlert("You are logged in","success");
            // localStorage.setItem('token',json.authtoken);
            navigate("/");
        }
        else{
            // props.showAlert("Invalid credentials","danger");
        }
  }

  return (
    <>
      <div className='mycard'>
        <div className="card auth-card">
          <h2>Instagram</h2>
          <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>CheckData()}>Login
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