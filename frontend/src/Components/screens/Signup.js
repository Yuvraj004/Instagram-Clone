import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css'

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
    await fetch("https://api.cloudinary.com/v1_1/ycloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        let newurl = data.url;
        setUrl(newurl);
        url =newurl;
        M.toast({ html: "Success", classes: "#43a047 green darken-1" });
        // navigate("/");
      })
      .catch((err) => {
        M.toast({
          html: "Something Went Wrong AF",
          classes: "#c62828 red darken-1",
        });
        console.log(err);
      });
  };
  const uploadFields = async () => {
    await fetch("https://ussinstaclonebackend.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, email: email, password: password, pic: url })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" })
        }
        else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" })
          navigate("/login");
        }
      }).catch(err => {
        console.error(err)
      })
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
                }}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" style={{ "color": "white" }} />
            </div>
          </div>
          <button style={{marginBottom:"1.625rem"}} className="buttonlog" type="submit" name="action" onClick={() => PostData()}>Signup
          </button>
          <h5 >
            <Link to="/login"className="buttonlog" >Already have an account </Link>
          </h5>
          <h6 style={{margin:"1.625rem"}} >
            <Link to="/reset" className="buttonlog" >Forgot Password </Link>
          </h6>
        </div>
      </div>
    </>
  )
}


export default Signup