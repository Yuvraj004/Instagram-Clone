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

  // const handleGoBack = () => {
  //   navigate(-1); // new line
  // };

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
        console.log(result.user)
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
        <ul key={98} style={{ 
          "marginRight": "7rem", color: "white", display: "flex", justifyContent: "space-between" }}>
            <li key={4}>
            {state && (<button data-target="modal1" type="submit" className=" searchbar__button modal-trigger ">
            <i className="material-icons">search</i>
          </button>)}
            </li>
            <li key={0}><Link className="dropdown-item btn waves-effect waves-light" to='/profilep'>Profile</Link></li>,
            <li key={1}><Link className="dropdown-item btn waves-effect waves-light" to='/Create'>Create Post</Link></li>,
            <li key={2}><Link className="dropdown-item btn waves-effect waves-light" to='/followeduser'>Followed People</Link></li>,
            <li key={3} style={{padding:"0px 20px",position:"relative",top:"-1px"}}>
              <button className="dropdown-item btn waves-effect waves-light"  onClick={() => { dispatch({ type: "CLEAR" }); localStorage.clear(); navigate("/signin") }}>Logout
              </button>
            </li>
        </ul>
      ]
    } else {
      return [
        <ul key={99} style={{ 
          "marginRight": "7rem", color: "white", display: "flex", justifyContent: "space-between" }}>
          <li key={30} className='dropdown-item ' style={{ marginRight: "2rem" }} >
            <Link className='buttonNav' to='/signin'>LOGIN</Link>
          </li>
          <li key={40} className='dropdown-item ' >
            <Link className='buttonNav' to='/signup'>SIGNUP</Link>
          </li>
        </ul>
      ]
    }
  }

  return (
    <nav className='navboxx ' id={`base ${isDesktop ? "desktop" : "mobile"}`}>

      <div className='navdiv btn-group' style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      }} id="myTopnav" ref={ref}>
        <Link to={state ? '/' : '/signin'} className='logo' >Instagram</Link>
        &nbsp;
        
        <div className="dropdown" style={{ display: "none" }}>
          {state && (<button data-target="modal1" type="submit" className=" searchbar__button modal-trigger ">
            <i className="material-icons">search</i>
          </button>)}
          <button type='button' className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            <i className="material-icons">&#xe3c7;</i>
          </button>
          <ul className="dropdown-menu dropdown-menu-start" style={{ backgroundColor: "transparent" ,alignItems:"center"}}>
            {renderList()}
          </ul>
        </div>
        <div className='desktopNav right' id="nav-mobile" >
          
            {renderList()}
        </div>
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