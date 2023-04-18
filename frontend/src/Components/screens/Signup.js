import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
require("dotenv").config({ path: ".env" });

const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url])
  const uploadPfp = async () => {
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
          <input className='logininput' type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className='logininput' type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className='logininput' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              PostData()
            }
          }} />
          <div className="file-field input-field">
            <div className="btn">
              <span>Upload Profile Photo</span>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  // uploadPfp();
                }}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" style={{ "color": "white" }} />
            </div>
          </div>
          <button style={{ marginBottom: "0.625rem" }} className="buttonlog" type="submit" name="action" onClick={() => PostData()}>Signup
          </button>
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