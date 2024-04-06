import React,{useEffect,createContext,useReducer,useContext  } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route,Routes,useNavigate } from 'react-router-dom'
import Home from './Components/screens/Home';
import Login from './Components/screens/Login';
import Profile from './Components/screens/Profile';
import Signup from './Components/screens/Signup';
import CreatePost from './Components/screens/CreatePost';
import UserProfile from './Components/screens/UserProfile';
import FollowedUser from './Components/screens/FollowedUser';
import './App.css';
import {reducer,initialState} from './reducers/userReducer';
import Reset from './Components/screens/Reset';
import NewPass from './Components/screens/NewPassword';
import Updatepfp from './Components/screens/UpdatePfp';
import useMediaQuery from './Components/useMediaQuery';
export const UserContext=createContext();


const Routing =()=>{
  const history = useNavigate()
  const {dispatch}=useContext(UserContext);
  useEffect(() => {
    const userwparse=localStorage.getItem("user");
    if(userwparse){
      const user = (userwparse===undefined) ?window.alert("undefined user id") : JSON.parse(userwparse);
      dispatch({type:"USER",payload:user})
      history('/');
    }
    else{
      history('/signup');
    }
  }, []);
  return(
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signin' element={<Login />}></Route>
      <Route exact path='/profilep' element={<Profile />}></Route>
      <Route path='/Signup' element={<Signup  />}></Route>
      <Route path='/Create' element={<CreatePost />}></Route>
      <Route path='/userprofile/:userid' element={<UserProfile />}></Route>
      <Route path='/followeduser' element={<FollowedUser />}></Route>
      <Route exact path='/reset' element={<Reset/>}></Route>
      <Route path='/reset/:token' element={<NewPass/>}></Route>
      <Route path='/updatepfp' element={<Updatepfp/>}></Route>

    </Routes>
  )
}


function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  const isDesktop = useMediaQuery('(min-width: 960px)');
  return (
    <>
     
      <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
          <Navbar isDesktop={isDesktop} />
            <Routing/>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App