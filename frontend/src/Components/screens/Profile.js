import React, { useEffect, useCallback, useState, useContext } from "react";
import { UserContext } from "../../App";
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state } = useContext(UserContext);
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/routes/post/mypost', {
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
        <div>
          <img className="dp"
            src={state?state.pic:"loading...!"}
          />
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
        {mypics.map(item => {
          return (
            <>
              <h2>Your Posts</h2>
              <div style={{ "display": "grid", "columnCount": 2, "gap": "50px 20px", "gridTemplateColumns": "auto auto" }}>
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
