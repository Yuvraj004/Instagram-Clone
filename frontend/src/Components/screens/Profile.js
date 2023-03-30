import React, { useEffect, useCallback, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
require("dotenv").config({ path: "./.env" });
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  // const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  useEffect(() => {
    fetch(`${process.env.BACKEND_URI}/mypost`, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => res.json())
      .then(result => { setPics(result.mypost) })
      .catch(err => console.log(err))
  }, [logResult])

  return (
    <div className="profile" style={{ color: "white" }} >
      <div className="p-section" style={{ "width": "100%" }}>
        <div className="box2">
          <img className="dp"
            src={state ? state.pic : "loading...!"}
          />

          <div className="button probtn">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Update Profile Photo
            </button>
          </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div style={{ display: "flex", justifyContent: "space-around", width: "108%" }}>
            <h5>{mypics.length} posts</h5>
            <h5>{state ? state.followers.length : "0"} followers</h5>
            <h5>{state ? state.following.length : "0"} following</h5>
          </div>

        </div>
      </div>
      <div className="gallery" style={{ "display": "flex" }}>
        {(mypics.length == 0) ? "NO POSTS YET " : mypics.map(item => {
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
