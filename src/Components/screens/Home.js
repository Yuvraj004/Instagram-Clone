import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([])
  const [data2, setData2] = useState({})
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllPosts();
    } else {
      navigate("/login");
    }
  }, [logResult]);

  var getAllPosts = async () => {
    await fetch('http://localhost:5000/routes/post/allpost', {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        'Access-Control-Allow-Headers': 'application/json',
      }
    }).then(res => res.json())
      .then(result => {
        setData(result.posts)
      })
      .catch(err => console.log(err))
  }
  var i = 0, num = 60;
  const hex = num.toString(16);
  useEffect(() => {
    data.map((item) => {
      var obje = { "_id": item._id, "name": "ANONYMOUS" };
      setData2(item.postedBy?item.postedBy:obje);
    })
  }, [])



  return (
    <div className='home'>
      {

        data.map((item) => {
          i++;
          return (
            <div className="card home-card" key={hex + i + num}>
              {/* {data2.map((item2,name) => {
                return (<h2 key={item._id}>{name }</h2>)
                })} */}
              {<h2 key={i}>{data2.name}</h2>}
              {/* {Object.keys(data2).map((item2) => {
                <h2 key={i}>{data2[item2].name}</h2>
              })} */}
              <div className="card-image">
                <img src={item.photo} alt='...' />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder="Add a text" />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home