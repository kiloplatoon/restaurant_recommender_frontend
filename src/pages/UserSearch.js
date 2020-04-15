import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


// for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    position: "absolute",
    
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));


class UserSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: false,
      matches: false,
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.renderUsers = this.renderUsers.bind(this)
  }

  // Handle filtering the list of users
  handleSearch(event) {
    let word = event.target.value
    console.log(word)
    
    //filter list by word
    let matching = []
    for (let i in this.state.users) {
      let username = this.state.users[i].username
      if (username.includes(word)) {
        matching.push(this.state.users[i])
      }
    }
    this.setState({matches: matching})

  }


  // Mount user list..
  async componentDidMount() {
    let myHeaders = new Headers()
    let users = await fetch(`http://localhost:8000/api/auth/profiles/`, {
      header: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(result => {
      result.shift()
      return result // remove admin from list
    })
    .catch(error => console.log('error', error));
    this.setState({
      users: users,
      matches: users,
    })
  }

  // Handle User click
  handleUserClick = async (user) => {
    console.log(`Sending request to ${user.username}`)
    // Create API call to create a new FriendRequest
    // from Current user ID to user.id
    if (this.props.isLoggedIn) {
      let fromUser = this.props.user.id
      let toUser = user.id
      console.log(`from user_id ${this.props.user.username}`)

      let test = await this.props.UserAPI.sendFriendRequest(fromUser, toUser)
      console.log(test.statusText)
      if (test.statusText == 'Created') {
        // return a success messege!!
        alert("Request sent!")
      } else {
        alert("Already a request pending")
      }
    }
    else {
      console.log('Log in')
    }
    
  }

  // Render list of users
  renderUsers = () => {
    let users = this.state.matches
    console.log(users)
    return users.map((user, id) => {
      return (
        <Form.Row key={id} md="auto">
          <Form.Group as={Col} controlId='username'>
            <Form.Label id='user-list'>{user.username}</Form.Label>
            <Button style={{marginTop: '1rem'}} className='btn btn-dark' onClick={() => {this.handleUserClick(user)}}> Send Friend Request </Button>
          </Form.Group>
          {/* <Form.Group as={Col} controlId='first_name'>
            <Form.Label>{user.first_name}</Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId='last_name'>
            <Form.Label>{user.last_name}</Form.Label>
          </Form.Group> */}
        </Form.Row>
      )
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
        <div className='container-fluid' >
          <br></br>
          <br></br>
          <input id='user-search' type='text' onChange={this.handleSearch} placeholder='search users'/>
          <br></br>
          <br></br>
          <Form>
            {/* {this.renderUserList()} */}
            {this.renderUsers()}
          </Form>
        </div>
      </div>
    )
  }

}

export default UserSearch
