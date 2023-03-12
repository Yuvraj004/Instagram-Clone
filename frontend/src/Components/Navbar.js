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
        <li key={1}><Link className="btn waves-effect waves-light" to='/followeduser'>Posts of people i follow</Link></li>,
        <li key={2}><button className="btn waves-effect waves-light" onClick={() => { dispatch({ type: "CLEAR" });localStorage.clear(); navigate("/login") }}>Logout
        </button></li>
      ]
    } else {
      return [
        <li key={3}><Link  to='/login' className='button' >Login</Link></li>,
        <li key={4}><Link to='/signup' className='button' style={{marginLeft:"10px"}}>Signup</Link></li>
      ]
    }
  }
  return (
    <nav className='navboxx' style={{marginTop:"10px","height":"95px"}}>
      <div  >
        <Link to={state ? '/' : '/login'} className='brand-logo' style={{marginLeft:"30px",marginTop:"15px",fontSize:"50px"}}>Instagram</Link>
        <ul id="nav-mobile" className='right' style={{ "marginRight": "10px" ,marginTop:"10px",color:"white",display:"flex",justifyContent:"space-between"}}>
          {renderList()}
        </ul>
      </div>
    </nav>

  )
}

export default Navbar