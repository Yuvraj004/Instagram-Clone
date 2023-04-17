import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
require("dotenv").config({ path: "./.env" });
const Navbar = ({ isDesktop }) => {
  const SearchModal = useRef(null);
  const ref = useRef(null);

  const [search, setsearch] = useState('');
  const { state, dispatch } = useContext(UserContext);
  const [userDetails, setuserDetails] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    M.Modal.init(SearchModal.current);
    const element = ref.current;
    myFunction(isDesktop, element);
  }, [1])


  const fetchUsers = async (query) => {
    setsearch(query);
    await fetch(`${process.env.BACKEND_URI}/search-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(res => {
        let result = res.json();
        // console.log(result.user)
        setuserDetails(result.user);
      })
  }

  function myFunction(isDesktop, element) {
    const x = element;
    if (isDesktop) {
      console.log("desktop");
      x.className = "navdiv";
    }
    else {
      x.className += " responsive";
      console.log("mobile");
    }
  }
  const renderList = () => {
    if (state) {
      return [
        <li key={4}>
          <span >
            <button data-target="modal1" type="submit" className="searchbar__button modal-trigger">
              <i className="material-icons">search</i></button>
          </span>
        </li>,
        <li key={0}><Link className="btn waves-effect waves-light" to='/profilep'>Profile</Link></li>,
        <li key={1}><Link className="btn waves-effect waves-light" to='/Create'>Create Post</Link></li>,
        <li key={2}><Link className="btn waves-effect waves-light" to='/followeduser'>Posts of people i follow</Link></li>,
        <li key={3}><button className="btn waves-effect waves-light" onClick={() => { dispatch({ type: "CLEAR" }); localStorage.clear(); navigate("/signin") }}>Logout
        </button></li>
      ]
    } else {
      return [
        <li key={30}><Link to='/signin' className='button' >Login</Link></li>,
        <li key={40}><Link to='/signup' className='button' >Signup</Link></li>
      ]
    }
  }

  return (
    <nav className='navboxx ' id={`base ${isDesktop ? "desktop" : "mobile"}`}>
      
      <div className='navdiv' style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      }} id="myTopnav" ref={ref}>
        <Link to={state ? '/' : '/signin'} className='logo' >Instagram</Link>&nbsp;
        <div className="dropdownNav">
          <button className="dropbtnNav">
            <i className="fa fa-caret-down"></i>
          </button>
          <ul className="dropdown-contentNav">
            {renderList()}
          </ul>
        </div>
        <ul id="nav-mobile" className='right' style={{ "marginRight": "3rem", color: "white", display: "flex", justifyContent: "space-between" }} >
          {renderList()}
          &nbsp;

        </ul>
        
      </div>

      {/*  Modal Structure  */}
      <div id="modal1" className="modal" ref={SearchModal}>
        <div className="modal-content">
          <input className='logininput' type="text" style={{ caretColor: "red" }} placeholder="Search Users" value={search} onChange={(e) => fetchUsers(e.target.value)} />
          <ul className="collection" style={{ color: "black", display: "flex", flexDirection: "column" }}>
            {!userDetails ? "No Users with this email" : userDetails.map(user => {
              return [
                <li className="collection-item avatar">
                  <img src={user.pic} alt=".../" className="circle" />
                  <span className="title">{user.name}</span>
                  <Link key={user._id} to={user._id !== state._id ? "/userprofile/" + user._id : "/profilep"} onClick={() => {
                    M.Modal.getInstance(SearchModal.current).close();
                    setsearch('');
                  }} className="secondary-content">
                    <i className="material-icons">grade</i>
                  </Link>
                </li>
              ]
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button href="#!" className="modal-close buttonlog">Agree</button>
        </div>
      </div>
    </nav>

  )
}

export default Navbar