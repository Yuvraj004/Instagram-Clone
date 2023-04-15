import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
import {Link} from 'react-router-dom';
require("dotenv").config({ path: ".env" });

const FollowedUser = () => {
  const [data, setData] = useState([])
  // const [data2, setData2] = useState({})
  //eslint-disable-next-line
  const { state } = useContext(UserContext)

  var [color, setColor] = useState("black");


  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllPosts();
    } else {
      navigate("/signin");
    }
  }, [logResult]);

  var getAllPosts = async () => {

    await fetch(`${process.env.REACT_APP_BACKEND_URI}/followerpost`, {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        'Access-Control-Allow-Headers': 'application/json',
      }
    }).then(res => {
      let result =res.json();
      setData(result.posts)
    }).catch(err => console.log(err))
  }
  var i = 0, num = 60;
  const hex = num.toString(16);

  const likePost = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URI}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => {
      let result = res.json();
      const newData = data.map(item => {
        if (item._id === result._id) { setColor("red"); return result }
        else { return item }
      })
      setData(newData);
    }).catch(err => { console.log(err) })
  }
  const unlikePost = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URI}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => {
      let result=res.json();
      const newData = data.map(item => {
        if (item._id === result._id) { setColor("black"); return result }
        else {
          return item
        }
      })
      setData(newData);
    }).catch(err => { console.log(err) })

  }

  //function for comments
  const makeComment = async (text, postId) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URI}/comment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        text: text,
        postId: postId
      })
    }).then(res =>{ 
      let result = res.json();
      const newData = data.map(item => {
        if (item._id === result._id) {
          return result
        }
        else { return item }
      })
      setData(newData);
    }).catch(err => { console.log(err) })

  }

//delete a post
  const deletePost = (postId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URI}/deletepost/${postId}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      let result= res.json();
      const newData=data.filter(item=>{

        return item._id!==result._id
      })
      setData(newData)
    }).catch(err=>{console.log(err)})
  }
  return (
    <div className='home' style={{color:"white",fontSize:"40px",textAlign:"center",margin:"20px"}}>
      {
        (data.length===0)?"YOU FOLLOW NO ONE":data.map((item) => {
          (item.likes.includes(state._id)) ? color = "red" : color = "black"
          i++;
          return (
            <div className="card home-card" key={hex + i + num}>
              <h5><Link to={item.postedBy._id !== state._id?"/userprofile/"+item.postedBy._id:"/profile"}><b>{item.postedBy.name}</b></Link>{item.postedBy._id === state._id && <i className='material-icons' style={{ float: "right",cursor:"pointer" }}
              onClick={()=>deletePost(item._id)}>delete</i>}</h5>
              <div className="card-image">
                <img src={item.photo} alt='...' />
              </div>
              <div className="card-content">

                <i className="material-icons like" style={{ "color": color, "cursor": "pointer" }} onClick={() =>
                  item.likes.includes(state._id) ? unlikePost(item._id) : likePost(item._id)
                }
                >favorite</i>
                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {
                  item.comments ? (item.comments.map(record => {
                    i++;
                    return (
                      <h6 key={item._id + record.postedBy._id + i}><span style={{ fontWeight: "500" }}>{record.postedBy.name}&nbsp;</span>{record.text}</h6>
                    )
                  })) : "No comments"
                }
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  makeComment(e.target[0].value, item._id) }}>
                  <input type="text" placeholder="Add a comment" required />
                </form>

              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default FollowedUser