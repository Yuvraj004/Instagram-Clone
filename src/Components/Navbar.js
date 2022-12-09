import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../App';
const Navbar=()=> {
  const {state}=useContext(UserContext);
  const renderList=()=>{
    if(state){
      return [
        <li><Link key={0} to='/profile'>Profile</Link></li>,
        <li><Link key={1} to='/create'>Create Post</Link></li>
      ]
    }else{
      return [
        <li><Link key={3} to='/login'>Login</Link></li>,
        <li><Link key={4} to='/signup'>Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
        <div className='nav-wrapper white' >
            <Link key={2} to={state?'/':'/login'} className='brand-logo'>Instagram</Link>
            <ul id="nav-mobile" className='right'>
                {renderList()}

            </ul>
        </div>
    </nav>
    
  )
}

export default Navbar