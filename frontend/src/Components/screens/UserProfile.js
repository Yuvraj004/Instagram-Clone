import React, { useEffect, useCallback, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from 'react-router-dom';
require("dotenv").config({ path: "./.env" });

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams()
  const [showfollow, setShowFollow] = useState(state? !state.following.includes(userid):true)
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  useEffect(() => {
    fetch(`${process.env.BACKEND_URI}/userprofile/${userid}`, {
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
    fetch(`${process.env.BACKEND_URI}/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        followId: userid,
      })
    })
      .then(res => res.json())
      .then((data) => {
        // console.log(data);
        // setProfile(result);
        dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
        localStorage.setItem("user", JSON.stringify(data))

        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id]
            }
          }
        })
        setShowFollow(false);
      })
  }
  const unfollowUser = () => {
    fetch(`${process.env.BACKEND_URI}/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
        localStorage.setItem("user", JSON.stringify(data))

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(item => item !== data._id)
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            }
          }
        })
        setShowFollow(true);
      })
  }

  return (
    <>
      <div className="profile" >
        <div className="p-section" style={{ "width": "100%" }}>
          <div>
            <img className="dp"
              src={!userProfile ? "Loading.." :userProfile.user.pic}
            />
          </div>
          <div style={{ color: "white" }}>
            {!userProfile ? "Loading..!" : ""}
            <h4>{!userProfile ? "Loading.." : userProfile.user.name}</h4>
            <h4 >{!userProfile ? "Loading.." : userProfile.user.email}</h4>
            <div style={{ display: "flex", justifyContent: "space-around", width: "108%" }}>
              <h5>{!userProfile ? "Loading.." : userProfile.posts.length} posts</h5>
              <h5>{!userProfile ? "Loading.." : userProfile.user.followers.length} followers</h5>
              <h5>{!userProfile ? "Loading.." : userProfile.user.following.length} following</h5>
              {showfollow ? <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => followUser()}>Follow
              </button> : <button className="btn waves-effect waves-light" type="submit" style={{backgroundColor:"grey"}} name="action" onClick={() => unfollowUser()}>following
              </button>}
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

export default UserProfile;
