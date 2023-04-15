import React, { useEffect, useCallback, useState, useContext } from "react";
// import { Link } from "react-router-dom";
import { UserContext } from "../../App";
require("dotenv").config({ path: ".env" });
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state } = useContext(UserContext);
  // const [image, setImage] = useState("")
  // const [url, setUrl] = useState(undefined)
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  const showPics = async ()=>{
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/mypost`, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    let result = await response.json();
    if(result){setPics(result.mypost);}
    else{console.log(result.err)}
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

          <div className="button probtn">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Update Profile Photo
            </button>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div style={{ display: "flex", justifyContent: "space-around", width: "108%" }}>
            <h5>{(mypics) ? mypics.length : '0' } posts</h5>
            <h5>{state ? state.followers.length : "0"} followers</h5>
            <h5>{state ? state.following.length : "0"} following</h5>
          </div>

        </div>
      </div>
      <div className="gallery" style={{ "display": "flex" }}>
        {(mypics.length === 0) ? "NO POSTS YET " : mypics.map(item => {
          return (
            <>
              <h2>Your Posts</h2>
              <div style={{ "display": "grid", "columnCount": 3, "rowCount": "3", "gap": "50px 20px", "gridTemplateColumns": "auto auto" }}>
                <div key={item._id} style={{ "display": "flex" }}>
                  {/* <p>{item.title}</p> */}
                  <img
                    key={item._id} className="item" style={{ "width": "100%", "height": "auto" }} src={item.photo} alt={item.title} />
                  {/* <p>{item.body}</p> */}
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  );

};

export default Profile;
