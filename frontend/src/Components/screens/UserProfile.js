import React, { useEffect, useCallback, useState,useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from 'react-router-dom'
const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state,dispatch } = useContext(UserContext);
  const { userid } = useParams()
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/routes/userpr/userprofile/${userid}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => res.json())
      .then(result => {
        // console.log(result);
        setProfile(result);
      })
      .catch(err => console.log(err))
  }, [logResult])

  const followUser = () => {
    fetch('http://localhost:5000/routes/userpr/follow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then(res => { res.json() })
      .then(result => {
        console.log(result)
        // dispatch({type:"USER",payload:{following:result.user.following,followers:result.user.following}})
      })
  }

  return (
    <>
      <div className="profile" >
        <div className="p-section" style={{ "width": "100%" }}>
          <div>
            <img className="dp"
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          <div style={{color:"white"}}>
            {!userProfile ? "Loading..!" : ""}
            <h4>{!userProfile ? "Loading.." : userProfile.user.name}</h4>
            <h4 >{!userProfile ? "Loading.." : userProfile.user.email}</h4>
            <div style={{ display: "flex", justifyContent: "space-around", width: "108%" }}>
              <h5>{!userProfile ? "Loading.." : userProfile.posts.length} posts</h5>
              <h5>{!userProfile ? "Loading.." : userProfile.user.followers.length} followers</h5>
              <h5>{!userProfile ? "Loading.." : userProfile.user.following.length} following</h5>
              <button className="btn waves-effect waves-light" type="submit" name="action"  onClick={() => followUser()}>Follow
              </button>
            </div>
          </div>
        </div>
        <div className="gallery" style={{ "display": "flex" }}>
          <h2>Your Posts</h2>
          <div style={{ "display": "grid", "columnCount": 2, "gap": "50px 20px", "gridTemplateColumns": "auto auto" }}>
            {!userProfile ? "Loading.." : userProfile.posts.map(item => {
              return (
                <div key={item._id} style={{ "display": "flex" }}>
                  {/* <p>{item.title}</p> */}
                  <img
                    key={item._id} className="item" style={{ "width": "100%", "height": "auto" }} src={item.photo} alt={item.title}
                  />
                  {/* <p>{item.body}</p> */}
                </div>)

            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
