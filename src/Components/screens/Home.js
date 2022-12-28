import React, { useState, useEffect,useCallback } from 'react'

const Home = () => {
  const [data, setData] = useState([])
  const logResult = useCallback(() => {
    return 2 + 2;
  }, []);
  useEffect(() => {
    async function getAllPosts() {
      await fetch('http://localhost:5000/api/post/allpost', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => res.json())
        .then(result => {
          setData(result.posts)
        })
    }
    getAllPosts();
  }, [logResult])

  return (
    <div className='home'>
      {
        data.map(item => {
          return (
            <div className='card home-card'  key={item._id}>
              <h2>{item.postedBy}</h2>
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