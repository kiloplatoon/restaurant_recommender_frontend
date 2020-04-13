import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './styles/App.css'
import UserAPI from './api/UserAPI'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import UserSearch from './pages/UserSearch'
import UserForm from './components/UserForm';
import ProfileMenu from './components/ProfileMenu'

import Main from './pages/Main'

import NavComponent from './components/NavComponent'



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)


  useEffect(() => {
    getLoggedInUser()
  }, [])

  const getLoggedInUser = async () => {
    let token = localStorage.getItem('dinnr-token')
    console.log(token)
    if (token !== 'null' && token !== 'undefined') {
      console.log('token: ', token)
      let res = await UserAPI.getLoggedInUser(token)
      let data = await res.json()
      setIsLoggedIn(true)
      setUser(data)
      console.log(data)
    } else {
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  const handleLogin = async evt => {
    evt.preventDefault()
    let user = {
      username : evt.target.username.value,
      password : evt.target.password.value
    }
    let res = await UserAPI.login(user)
    //console.log(res)
    //console.log(res.token !== undefined)
    if (res.token !== undefined && res.token !== null) {
      localStorage.setItem('dinnr-token', res.token)

      let userID = res.user.id
      let userProfile = await UserAPI.getProfile(userID, res.token)
      let userData = await UserAPI.getUser(userID, res.token)
      let user = {
        id: userID,
        username: userData.username,
        phone_number: userProfile.phone_number,
        email: userData.email,
        friends: userProfile.friends,
        first_name: userData.first_name,
        last_name: userData.last_name
      }
      console.log(user)
      setUser(user)
      setToken(res.token)
      setIsLoggedIn(true)
      alert('Successfully Logged In!')
    } else {
      alert('Invalid Email or Password')
    }
  }

  const handleSignup = async evt => {
    evt.preventDefault()
    let user = {
      username: evt.target.username.value,
      email: evt.target.email.value,
      first_name: evt.target.first_name.value,
      last_name: evt.target.last_name.value,
      password: evt.target.password.value,
      // confirm_password: evt.target.password.value
    }
    let response = await UserAPI.signup(user)
    console.log(response)
    setIsLoggedIn(true)
    setUser(response.user)
    setToken(response.token)
    localStorage.setItem('dinnr-token', response.token)
    alert('Successfully created a new account!')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.setItem('dinnr-token', null)
    localStorage.clear()
    alert('Logged Out')
    return <Redirect to='/login' />
  }  

  const renderLogin = () => {
    return (
      <Login
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout} 
      />
    )
  }

  const renderSignup = () => {
    return (
      <Signup 
      isLoggedIn={isLoggedIn}
      user={user}
      handleSignup={handleSignup}
      handleLogout={handleLogout} 
      />
    )
  }

  const renderHome = () => {
    return(
      <Home 
      isLoggedIn={isLoggedIn}
      user={user}
      handleLogout={handleLogout}
      />
    )
  }

  const renderMain = () => {
    return(
      <Main 
      isLoggedIn={isLoggedIn}
      user={user}
      handleLogout={handleLogout}
      getLoggedInUser={getLoggedInUser}
      />
    )
  }

  const renderEditProfile = () => {
    return(
      <EditProfile
      isLoggedIn={isLoggedIn}
      user={user}
      token={token}
      handleSignup={handleSignup}
      handleLogout={handleLogout}
      UserAPI={UserAPI}
      />
    )
  }

  const renderProfile = () => {
    return(
      <Profile
      isLoggedIn={isLoggedIn}
      user={user}
      token={token}
      handleSignup={handleSignup}
      handleLogout={handleLogout}
      UserAPI={UserAPI}
      getLoggedInUser={getLoggedInUser}
      />
    )
  }

  const renderUserSearch = () => {
    return(
      <UserSearch
      isLoggedIn={isLoggedIn}
      user={user}
      token={token}
      handleSignup={handleSignup}
      handleLogout={handleLogout}
      UserAPI={UserAPI}
      />
    )
  }

  return (
    <>
    {
      // !isLoggedIn 
      // ?
      // <Redirect to='/login' /> 
      // :  
      <div className="App">
        <div className='container-fluid' id='appBG'>
          <Router>
            <div>
              <NavComponent 
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              />
            </div>
            <ProfileMenu user={user}/>
            <Route exact path='/home' render={renderHome} />
            <Route exact path='/login' render={renderLogin} />
            <Route exact path='/signup' render={renderSignup} />
            <Route exact path='/partners' component={UserForm} />
            <Route exact path='/profile' render={renderProfile} />
            <Route exact path='/editprofile' render={renderEditProfile} />
            <Route exact path='/start' render={renderMain} />

            <Route exact path='/search' render={renderUserSearch} />
          </Router>
        </div>
      </div>
    }
    </>
  );
}

export default App;