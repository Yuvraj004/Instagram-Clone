import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';
require("dotenv").config({ path: ".env" });

const Home = () => {
  const [data, setData] = useState([])
  const { state } = useContext(UserContext)
  let [color, setColor] = useState("red");
  let [loader, setLoader] = useState(true);

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
    setLoader(true)
    let res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/allpost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    let result = await res.json();
    if (result) { setLoader(false); setData(result.posts); }
    else { console.log(result.err) }
  }
  var i = 0, num = 60;
  const hex = num.toString(16);

  const likePost = async (id) => {
    setLoader(true)
    let resp = await fetch(`${process.env.REACT_APP_BACKEND_URI}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId: id
      })
    })
    let result = await resp.json();
    if (result) {
      const newData = data.map(item => {

        if (item._id === result._id) { setColor("red"); return result; }
        else { console.log("no idealike2"); return item; }
      })
      setData(newData);
      setLoader(false)
    }
    else {
      console.log(result.error)
    }
  }
  const unlikePost = async (id) => {
    setLoader(true)
    let respo = await fetch(`${process.env.REACT_APP_BACKEND_URI}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId: id
      })
    })
    let result = await respo.json();
    if (result) {
      const newData = data.map(item => {

        if (item._id === result._id) { setColor("black"); console.log("no idea"); return result }
        else {
          return item
        }
      })
      setData(newData);
      setLoader(false);
    }
    else { console.log(result.err) }
  }
  //function for comments
  const makeComment = async (text, postId) => {
    setLoader(true)
    let respon = await fetch(`${process.env.REACT_APP_BACKEND_URI}/comment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        text: text,
        postId: postId
      })
    })
    let result = await respon.json();
    if (result) {
      const newData = data.map(item => {
        if (item._id === result._id) {
          return result
        }
        else { return item }
      })
      setData(newData);
      setLoader(false)
    }
    else { console.log(result.err) }

  }

  const deletePost = async (postId) => {
    setLoader(true)
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/deletepost/${postId}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    let result = response.json();
    if (result) {
      const newData = data.filter(item => {

        return item._id !== result._id
      })
      setData(newData);
      setLoader(false)
    }
    else {
      console.log(result.err);
    }

  }
  return (
    <div className='home'>
      {(!data) ? <h1>Loading</h1> :
        data.map((item) => {
          (item.likes.includes(state._id)) ? color = "red" : color = "black"
          i++;
          return (
            <div className="card home-card" key={hex + i + num}>
              <h5>
                <Link to={item.postedBy._id !== state._id ? "/userprofile/" + item.postedBy._id : "/profilep"}><b>{item.postedBy.name}</b>
                </Link>{item.postedBy._id === state._id && <i className='material-icons' style={{ float: "right", cursor: "pointer" }}
                  onClick={() => deletePost(item._id)}>delete</i>}
              </h5>
              <div className="card-image">
                <img src={item.photo} alt='...' />
              </div>
              <Dna
                visible={loader}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
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
                <form onSubmit={(e) => { e.preventDefault(); makeComment(e.target[0].value, item._id) }}>
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

export default Home;