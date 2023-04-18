import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import { Dna } from 'react-loader-spinner';
require("dotenv").config({ path: "./.env" });

//Dialog box to create a new post
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  var [url, setUrl] = useState("");
  let navigate = useNavigate();
  let [loader, setLoader] = useState(false);

  const postDetails = async () => {
    console.log("reaching on post");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ig-clone");//ig-clone
    data.append("cloud_name", "ycloud");//ycloud
    setLoader(true);
    //uploading image to cloudinary
    let respons = await fetch("https://api.cloudinary.com/v1_1/ycloud/image/upload", {
      method: "POST",
      body: data,
    })
    let dataRes = await respons.json();
    if (dataRes) {
      const newurl = dataRes.url;
      url = newurl;
      setUrl(newurl);
    }
    else {
      console.log(dataRes.error);
    }
    //uploading data to database
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/createpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    });
    let json = await response.json();
    if (json) {
      setLoader(false);
      M.toast({ html: "Success", classes: "#43a047 green darken-1" });
      navigate("/");
    } else {
      console.log(json.error);
      M.toast({
        html: "Something Went Wrong AF",
        classes: "#c62828 red darken-1",
      });
    }
    console.log("done on post");
  };

  return (
    <>
      <Dna
        visible={loader}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <div
        className="card input-filed createPostCard"
        style={{
          margin: "10px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
          marginTop: "150px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <input
          className="createPostInput"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="createPostInput"
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input
              className="createPostInput"
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
        <button
          className="btn createPostBtn"
          type="submit"
          name="action"
          onClick={() => {
            postDetails();
          }}
        >
          Submit Post
        </button>
      </div>
    </>
  );
};
export default CreatePost;
