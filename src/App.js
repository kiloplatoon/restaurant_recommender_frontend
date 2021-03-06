import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './styles/App.css'
import UserAPI from './api/UserAPI'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Match from './pages/Match'
import Continue from './pages/Continue'

import Profile from './pages/Profile'
import UserSearch from './pages/UserSearch'
import UserForm from './components/UserForm';
import ProfileMenu from './components/ProfileMenu'

import Main from './pages/Main'

import NavComponent from './components/NavComponent'



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [pendingSessions, setPendingSessions] = useState(null)
  const [continued, setContinued] = useState(null)


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
      data.shift() // remove admin from list
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

      /// Check for pending sessions
      let pendingSession = await UserAPI.checkForSession(userData.id)

      if (pendingSession.length > 2) {
        console.log('ALERT')
        alert(`YOU HAVE A PENDING SESSION!!`)
        setPendingSessions(pendingSession)

        // props.pendingSessions is now the session object..
        // redirect to another swiping page passing props.pendingSessions as another prop..

        
      }
      // console.log(JSON.parse(pendingSession[0].all_resteraunts))
      pendingSession[0].all_resteraunts = JSON.parse(pendingSession[0].all_resteraunts)
      setPendingSessions(pendingSession)
      ////
      let friendsList = userProfile.friends
      console.log(friendsList)
      for (let i in friendsList) {
        let friendID = friendsList[i]
        let friendData = await UserAPI.getUser(friendID, res.token)
        .then(response => response)
        .then(result => {
          console.log(result)
          return result
        })
        .catch(error => console.log('error', error));

        friendsList[i] = friendData

      }
      console.log(userData)
      
      
      let user = {
        id: userID,
        username: userData.username,
        phone_number: userProfile.phone_number,
        email: userData.email,
        friends: friendsList,
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
      pendingSessions={pendingSessions}
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
      UserAPI={UserAPI}
      pendingSessions={pendingSessions}
      
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

  const renderMatch = () => {
    return(
      <Match 
      isLoggedIn={isLoggedIn}
      user={user}
      handleLogout={handleLogout}
      getLoggedInUser={getLoggedInUser}
      />
    )
  }

  const renderContinueSession = () => {
    return(
      <Continue 
      isLoggedIn={isLoggedIn}
      user={user}
      handleLogout={handleLogout}
      getLoggedInUser={getLoggedInUser}
      pendingSessions={pendingSessions}
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
            <Route exact path='/start' render={renderMain} />
            <Route exact path='/continue' render={renderContinueSession} />
            <Route exact path='/search' render={renderUserSearch} />
            <Route exact path='/match' render={renderMatch} />
          </Router>
        </div>
      </div>
    }
    </>
  );
}

export default App;