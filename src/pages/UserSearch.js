import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

class UserSearch extends Component {
  state = {
    users: false
  }
  // Get a list of all users
  getUsers = () => {
    return('hi')
 
  }

  async componentDidMount() {
    let myHeaders = new Headers()
    let users = await fetch(`http://localhost:8000/api/auth/profiles/`, {
      header: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));
    console.log(users)
    this.setState({users: users})
  }

    // Render list of users
  renderUsers = () => {
    let users = this.state.users
    console.log(users)
    return users.map((user, id) => {
      return <ul key={id} onClick={() => {
        console.log(users[id])
      }}> 
        {user.username} | {user.first_name} | {user.last_name}
      </ul>
    })
  }

  render() {
    if (!this.state.users.length) {
      return (
        <div> loading </div>
      )
    }

    return (
      <div className="App">
        <div className='container-fluid' id='appBG'>
          {this.renderUsers()}
        </div>
      </div>
    )
  }

}

export default UserSearch
