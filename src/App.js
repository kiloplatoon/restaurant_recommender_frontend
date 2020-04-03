import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import UserAPI from './api/UserAPI'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavComponent from './components/NavComponent'
import UserForm from './components/UserForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)


  useEffect(() => {
    getLoggedInUser()
  }, [])

  const getLoggedInUser = async () => {
    let token = localStorage.getItem('dinnr-token')
    if (token !== 'null' && token !== 'undefined') {
      console.log('token: ', token)
      let res = await UserAPI.getLoggedInUser(token)
      let data = await res.json()
      setIsLoggedIn(true)
      setUser(data)
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
    console.log(res.token !== undefined)
    if (res.token !== undefined && res.token !== null) {
      localStorage.setItem('dinnr-token', res.token)
      setUser(res.user)
      setIsLoggedIn(true)
      alert('Successfully Logged In!')
    } else {
      alert('Invalid Username or Password')
    }
  }

  const handleSignup = async evt => {
    evt.preventDefault()
    let user = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await UserAPI.signup(user)
    setIsLoggedIn(true)
    setUser(response.user)
    localStorage.setItem('dinnr-token', response.token)
    alert('Successfully created a new account!')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.setItem('dinnr-token', null)
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

  return (
    <div className="App">
      <div className='container-fluid' id='appBG'>
      <Router>
        <div>
          <NavComponent 
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          />
        </div>
        <Route exact path='/home' render={renderHome} />
        <Route exact path='/login' render={renderLogin} />
        <Route exact path='/signup' render={renderSignup} />
        <Route exact path='/partners' component={UserForm} />
      </Router>
      </div>
    </div>
  );
}

export default App;