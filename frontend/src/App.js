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
export const UserContext=createContext()

const Routing =()=>{
  const history = useNavigate()
  const {dispatch}=useContext(UserContext);
  useEffect(() => {
    const userwparse=localStorage.getItem("user");
    if(userwparse){
      const user =JSON.parse(userwparse);
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
      <Route path='/login' element={<Login />}></Route>
      <Route exact path='/profile' element={<Profile />}></Route>
      <Route path='/signup' element={<Signup  />}></Route>
      <Route path='/create' element={<CreatePost />}></Route>
      <Route path='/userprofile/:userid' element={<UserProfile />}></Route>
      <Route path='/followeduser' element={<FollowedUser />}></Route>
      <Route exact path='/reset' element={<Reset/>}></Route>
      <Route path='/reset/:token' element={<NewPass/>}></Route>
    </Routes>
  )
}


function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <>
     
      <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
          <Navbar />
            <Routing/>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App