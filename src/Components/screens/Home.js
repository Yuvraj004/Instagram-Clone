import React, { useState, useEffect } from 'react'

const Home = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/allpost', {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {console.log(res.json())})
      .then(result => {
        console.log(typeof(result))
        setData(result.posts)
      })
  }, [])
  return (
    <div className='home'>
      {
        data.map(item => {
          return (
            <div className='card home-card'>
              <h2>{item.postedBy.name }</h2>
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