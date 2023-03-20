import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
const Navbar = () => {
  const SearchModal = useRef(null);
  const [search, setsearch] = useState('');
  const { state, dispatch } = useContext(UserContext);
  const [userDetails, setuserDetails] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    M.Modal.init(SearchModal.current)
  }, [10])

  const renderList = () => {
    if (state) {
      return [
        <li key={4}>
          <span >
            <button data-target="modal1" type="submit" class="searchbar__button modal-trigger">
              <i class="material-icons">search</i></button>
          </span>
        </li>,
        <li key={0}><Link className="btn waves-effect waves-light" to='/profile'>Profile</Link></li>,
        <li key={1}><Link className="btn waves-effect waves-light" to='/create'>Create Post</Link></li>,
        <li key={2}><Link className="btn waves-effect waves-light" to='/followeduser'>Posts of people i follow</Link></li>,
        <li key={3}><button className="btn waves-effect waves-light" onClick={() => { dispatch({ type: "CLEAR" }); localStorage.clear(); navigate("/login") }}>Logout
        </button></li>
      ]
    } else {
      return [
        <li key={30}><Link to='/login' className='button' >Login</Link></li>,
        <li key={40}><Link to='/signup' className='button' style={{ marginLeft: "10px" }}>Signup</Link></li>
      ]
    }
  }
  const fetchUsers = async(query) => {
    setsearch(query);
    await fetch("/search-users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: search
      })
    })
      .then(res => { res.json() })
      .then(function (result) {
        console.log(result)
        // setuserDetails(results.user)
      })
    
  }
  return (
    <nav className='navboxx'>
      <div className='navdiv' style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Link to={state ? '/' : '/login'} className='logo' >Instagram</Link>&nbsp;
        <ul id="nav-mobile" className='right' style={{ "marginRight": "3rem", color: "white", display: "flex", justifyContent: "space-between" }} >
          {renderList()}
        </ul>
      </div>
      {/*  Modal Structure  */}
      <div id="modal1" className="modal" ref={SearchModal}>
        <div className="modal-content">
          <input className='logininput' type="text" placeholder="Search Users" value={search} onChange={(e) => fetchUsers(e.target.value)} />
          <ul class="collection" style={{ color: "black", display: "flex", flexDirection: "column" }}>
            <li class="collection-item avatar">
              <img src="images/yuna.jpg" alt=".../" class="circle" />
              <span class="title">Title</span>
              <p>First Line <br />
                Second Li
              </p>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle">folder</i>
              <span class="title">Title</span>
              <p>First Line <br />
                Second Line
              </p>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle green">insert_chart</i>
              <span class="title">Title</span>
              <p>First Line <br />
                Second Line
              </p>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle red">play_arrow</i>
              <span class="title">Title</span>
              <p>First Line <br />
                Second Line
              </p>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
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