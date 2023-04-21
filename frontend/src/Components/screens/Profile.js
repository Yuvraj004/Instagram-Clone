import React, { useEffect, useCallback, useState, useContext } from "react";
// import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";
import { Dna } from 'react-loader-spinner';
require("dotenv").config({ path: ".env" });
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  var [url, setUrl] = useState(undefined);
  let [loader, setLoader] = useState(false);
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  const uploadPfp = async () => {
    setLoader(true)
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ig-clone");//ig-clone
    data.append("cloud_name", "ycloud");//ycloud

    //uploading image to cloudinary
    let response = await fetch("https://api.cloudinary.com/v1_1/ycloud/image/upload", {
      method: "post",
      body: data,
    })

    let dataRes = await response.json();
    if (dataRes) {
      let newurl = dataRes.url;
      url = newurl;
      setUrl(newurl);
      // console.log(newurl);
      state.pic = newurl;
      const updation = await fetch('/updatepic', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          pic: url
        })
      })
      let result = await updation.json();
      M.toast({ html: "Photo Updated", classes: "#43a047 green darken-1" });
      localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }));
      dispatch({ type: "UPDATEPIC", payload: result.pic });
      setLoader(false)
    }

    else {
      M.toast({
        html: "Something Went Wrong AF",
        classes: "#c62828 red darken-1",
      });
      console.log(dataRes.error);
    }
  }
  const showPics = async () => {
    setLoader(true)
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/mypost`, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    let result = await response.json();
    if (result) { setPics(result.mypost); setLoader(false) }
    else { console.log(result.err) }
  }
  useEffect(() => {
    showPics();
  }, [logResult])

  return (
    <div className="profile" style={{ color: "white" }} >
      <div className="p-section" style={{ "width": "100%" }}>
        <div className="box2">
          <img className="dp"
            src={state ? state.pic : "loading...!"}
            alt="..no"
          />
          <div className="button probtn" style={{ backgroundColor: "transparent" }}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Update Profile Photo
            </button>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Change/Add Photo</h1>
              </div>
              <div className="modal-body">
                <div className="" style={{ color: "black", display: "flex", flexDirection: "row" }}>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    style={{ color: "black" }}
                  />
                  <p>Give your PFP</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                  &nbsp;
                  <button type="button" className="btn btn-primary" onClick={() => { uploadPfp(); }}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="infoProfile" >
          <h4 >{state ? state.name : "loading"}</h4>
          <div style={{ display: "flex", justifyContent: "space-around", width: "108%" }}>
            <h5>{(mypics) ? mypics.length : '0'} posts</h5>
            <h5>{state ? state.followers.length : "0"} followers</h5>
            <h5>{state ? state.following.length : "0"} following</h5>
          </div>
        </div>
      </div>
      <div className="gallery" style={{ "display": "flex" }}>
        <h2>Your Posts</h2>
        {(mypics.length === 0) ? "NO POSTS YET " : mypics.map(item => {
          return (
            <>
              <div key={item._id + 9} style={{ "display": "grid", "columnCount": 3, "rowCount": "3", "gap": "50px 20px", "gridTemplateColumns": "auto auto" }}>
                <div key={item._id} style={{ "display": "flex" }}>
                  {/* <p>{item.title}</p> */}
                  <img
                    key={item._id + 31} className="item" style={{ "width": "100%", "height": "auto" }} src={item.photo} alt={item.title} />
                </div>
                <Dna
                  visible={loader}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
            </>
          )
        })}
      </div>
    </div>
  );

};

export default Profile;
