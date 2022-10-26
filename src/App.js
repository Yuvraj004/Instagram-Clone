import React from 'react';
import Navbar from './Components/Navbar';
import {BrowserRouter,Route, Routes} from 'react-router-dom' 
import Home from './Components/screens/Home';
import Login from './Components/screens/Login';
import Profile from './Components/screens/Profile';
import Signup from './Components/screens/Signup';
import CreatePost from './Components/screens/CreatePost';

import './App.css';
function App() {
  return (
    <>  
        
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/create' element={<CreatePost/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App