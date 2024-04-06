import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
import { Dna } from 'react-loader-spinner';
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const Login = () => {
  const { dispatch } = useContext(UserContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  let [loader, setLoader] = useState(false);
  const CheckData = async () => {
    setLoader(true);
    console.log(`${process.env.REACT_APP_BACKEND_URI}`);
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    let jsond = await response.json();
    if (jsond) {
      M.toast({ html: "GOTCHA", classes: "#43a047 green darken-3", displayLength: 10000 });
      //save the token and redirect
      localStorage.setItem('token', jsond.token);
      localStorage.setItem('user', JSON.stringify(jsond.user));
      dispatch(({ type: "USER", payload: jsond.user }));
      setLoader(false);
      navigate("/profilep");


    }
    else {
      console.error(jsond.err);
      M.toast({ html: "Retry Please", classes: "#c62828 red darken-3" });
    }
  }

  return (
    <>
      <div className='container'>
        <div className="login-box shadow">
          {/* <h2 className='loginh2'>Instagram</h2> */}

          {/* <!-- email --> */}
          <div className="detailBox">
            <label for="email" class="fl fontLabel"> Email ID: </label>
    			  <div class="fl iconBox"><i class="fa fa-envelope" aria-hidden="true"></i></div>
    			  <div class="fr">
              <input name='email' className='textBox' type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />   			  
            </div>
    			  <div class="clr"></div>
    		  </div>
          
          {/* <!-- password  --> */}
          <div className="detailBox">
            <label for="password" class="fl fontLabel"> Password: </label>
            <div class="fl iconBox"><i class="fa fa-key" aria-hidden="true"></i></div>
            <div class="fr">
              <input name='password' className='textBox' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter") {
                CheckData()
              }
            }} />
            </div>
            <div class="clr"></div>
    		  </div>
          <div className='padTop'>
          <button className=" buttonlog" type="submit" name="action" onClick={() => CheckData()}>Login
          </button>
          </div>
          <Dna
            visible={loader}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button className=" buttonlog hideColor" style={{ justifyContent: "flex-start" }} >
              <Link to="/signup" className='linkstyle '  >Don't have an account </Link>
            </button>
            <button className=" buttonlog hideColor" style={{ position: "relative", justifyContent: "flex-end" }}>
              <Link to="/reset" className='linkstyle ' >Forgot Password </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login