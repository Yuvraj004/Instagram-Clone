import React from 'react';
import {Link} from 'react-router-dom';

const Signup=()=> {
  return (
    <>
      <div className='mycard'>
        <div className="card auth-card">
          <h2>Instagram</h2>
          <input type="text" placeholder="name"/>
          <input type="email" placeholder="email"/>
          <input type="text" placeholder="password"/>
          <button className="btn waves-effect waves-light" type="submit" name="action">Signup
          </button>
          <h5>
            <Link to="signin">Already have an account </Link>
          </h5>
        </div>
      </div>
    </>
  )
}


export default Signup