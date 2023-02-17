import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li key={0}><Link className="btn waves-effect waves-light" to='/profile'>Profile</Link></li>,
        <li key={1}><Link className="btn waves-effect waves-light" to='/create'>Create Post</Link></li>,
        <li key={2}><button className="btn waves-effect waves-light" onClick={() => { localStorage.clear(); dispatch({ type: 'CLEAR' }); navigate("/login") }}>Logout
        </button></li>
      ]
    } else {
      return [
        <li key={3}><Link to='/login'>Login</Link></li>,
        <li key={4}><Link to='/signup'>Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className='nav-wrapper white' >
        <Link to={state ? '/' : '/login'} className='brand-logo'>Instagram</Link>
        <ul id="nav-mobile" className='right' style={{ "marginRight": "10px" }}>
          {renderList()}

        </ul>
      </div>
    </nav>

  )
}

export default Navbar