/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect,useCallback,useState,useContext} from "react";
import {UserContext} from "../../App";
const Profile = () => {
  const [mypics,setPics]=useState([]);
  const {state,dispatch}=useContext(UserContext);
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/routes/post/mypost',{
      headers:{
        "authorization":`Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>res.json())
    .then(result=>setPics(result.mypost))
    // .catch(err=>console.log(err))
  }, [logResult])
  
  return (
    <div className="profile" >
      <div className="p-section">
        <div>
          <img className="dp"
          src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div>
          <h4>{state?state.name:"loading"}</h4>
          <div style={{ display: "flex", justifyContent: "space-around",width:"108%" }}>
            <h5>40 posts</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map(item=>{
          return(
          <img
            key={item._id}
            className="item"
            src= {item.photo}
            alt={item.title}
          />)
          
        })}
      </div>
    </div>
  );
};

export default Profile;
