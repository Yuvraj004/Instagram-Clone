import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { Dna } from 'react-loader-spinner';
require("dotenv").config({ path: ".env" });

const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)
  let [loader, setLoader] = useState(false);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url])
  const uploadPfp = async () => {
    setLoader(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ig-clone");//ig-clone
    data.append("cloud_name", "ycloud");//ycloud

    //uploading image to cloudinary
    let response = await fetch("https://api.cloudinary.com/v1_1/ycloud/image/upload", {
      method: "post",
      body: data,
    })
        let dataResponse =  await response.json();
        if(dataResponse){
          let newurl = dataResponse.url;
          setUrl(newurl);
          M.toast({ html: "Success", classes: "#43a047 green darken-1" });
          uploadFields();
        }
        else{
          M.toast({
          html: "Something Went Wrong AF",
          classes: "#c62828 red darken-1",
        });
        console.log(dataResponse.error);
        }
  };
  const uploadFields = async () => {
    setLoader(true);
    let response = await fetch(process.env.REACT_APP_BACKEND_URI+"/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, pic: url })
    })
    let data = await response.json();
    if (data) {
      M.toast({ html: data.message, classes: "#43a047 green darken-1" })
      setLoader(false);
      navigate("/signin");
    }
    else {
      M.toast({ html: data.error, classes: "#c62828 red darken-3" })
      console.log(data.err);
    }
  }
  let navigate = useNavigate();
  const PostData = async () => {
    if (image) {
      uploadPfp();
    }
    else {
      uploadFields();
    }
  }

  return (
    <>
      <div className='container'>
        <div className="signup-box shadow">
          <h2 className='loginh2'>Instagram</h2>
          {/* <!-- first name --> */}
          <div className='detailBox'>
            <label for='firstName' className='fl fontLabel'>Name: </label>
            <div className='new iconBox'>
              <i className='fa fa-user' aria-hidden="true"></i>
            </div>
            <div className='fr'>
              <input name='firstName' className=' textBox' autoFocus='on' type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='clr'></div>
          </div>
          
          <div class="detailBox">
            <label for="email" class="fl fontLabel"> Email ID: </label>
    			  <div class="fl iconBox"><i class="fa fa-envelope" aria-hidden="true"></i></div>
    			  <div class="fr">
              <input name='email' className='textBox' type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />    			  
            </div>
    			<div class="clr"></div>
    		  </div>
          <div class="detailBox">
            <label for="password" class="fl fontLabel"> Password </label>
            <div class="fl iconBox"><i class="fa fa-key" aria-hidden="true"></i></div>
            <div class="fr">
              <input name='password' className='textBox' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter") {
                PostData()
              }
            }} />
            </div>
            <div class="clr"></div>
    		</div>
          
          <div className="file-field input-field">
            <div className='buttonNav'>
              <label htmlFor='pf-p'>Upload Profile Photo</label>
              <input
                id='pf-p'
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  // uploadPfp();
                }}
              />
            </div>
            {image && (<div className="file-path-wrapper">
              <input className="file-path validate" type="text" style={{ "color": "white" }} />
            </div> )}
          </div>
          <button style={{ marginBottom: "0.625rem" }} className="buttonlog" type="submit" name="action" onClick={() => PostData()}>Signup
          </button>
          <Dna
            visible={loader}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button className="buttonlog">
              <Link to="/signin" className="linkstyle" >Already have an account </Link>
            </button>
            <button className="buttonlog">
              <Link to="/reset" className="linkstyle" >Forgot Password </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


export default Signup