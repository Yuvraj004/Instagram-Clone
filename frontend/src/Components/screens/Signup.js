import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css'

const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

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
        const newurl = data.url;
        url = newurl;
        console.log(url);
      })
      .catch((err) => {
        console.log(err);
      });

    //uploading data to database
    let response = await fetch("http://localhost:5000/routes/post/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    });
    let json = await response.json();
    if (json) {
      M.toast({ html: "Success", classes: "#43a047 green darken-1" });
      navigate("/");
    } else {
      console.log(json.error);
      M.toast({
        html: "Something Went Wrong AF",
        classes: "#c62828 red darken-1",
      });
    }
  };
  const uploadFields = async () => {
    await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, email: email, password: password })
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
        console.log(err)
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
              <input className="file-path validate" type="text" />
            </div>
          </div>
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