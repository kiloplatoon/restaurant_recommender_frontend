import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class ViewFriends extends Component {

  constructor(props) {
    super(props)
    this.state = {
      friends: false,
      pendingRequests: false,
    }
    this.handleSearch = this.handleSearch.bind(this)
    //this.renderUsers = this.renderUsers.bind(this)
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

  // on mount set create api call and set state for friends and pendingRequests..
  async componentDidMount() {

    // Set pending friend requests...
    let myRequests = await this.props.UserAPI.getFriendRequests(this.props.user.id)
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));
    
    let pendingFriends = []
    for (let i in myRequests) {
      let friendID = myRequests[i].from_user
      console.log(friendID)
      let friendData = await this.props.UserAPI.getUser(friendID, this.props.token)
      .then(response => response)
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));

      pendingFriends.push(friendData)
    }


    this.setState({pendingRequests: pendingFriends})
    this.setState({friends: this.props.user.friends})
  }

  // Handle User click
  handleUserClick = async (user) => {
    console.log(`Accepting request from ${user.username}`)
    // Create API call to create a new FriendRequest
    // from Current user ID to user.id
    
    let fromUser = this.props.user.id
    let toUser = user.id
    console.log(`from user_id ${this.props.user.username}`)

    let test = await this.props.UserAPI.acceptFriendRequest(fromUser, toUser)
    .then(response => response)
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));

    console.log(test)
    
    
  }


  // RENDER PENDING REQUESTS
  renderPendingRuests(pendingRequests) {
    if (pendingRequests.length < 1) {
      return (
        <div>
          No Requests...
        </div>
      )
    }
    return pendingRequests.map((user, id) => {
      return (
        <Form.Row key={id} md="auto">
          <Form.Group as={Col} controlId='username'>
            <Form.Label id='user-list'>{user.username}</Form.Label>
            <Button style={{marginTop: '1rem'}} className='btn btn-dark' onClick={() => {this.handleUserClick(user)}}> Accept </Button>
          </Form.Group>
        </Form.Row>
      )
    })
  }

  // RENDER FRIENDS
  renderFriends(friends) {
    if (friends.length < 1) {
      return (
        <div>
          No Friends...
        </div>
      )
    }
    return friends.map((user, id) => {
      return (
        <Form.Row key={id} md="auto">
          <Form.Group as={Col} controlId='username'>
            <Form.Label id='user-list'>{user.username}</Form.Label>
            <Button style={{marginTop: '1rem'}} className='btn btn-dark' onClick={() => {this.handleUserClick(user)}}> Go Dine </Button>
          </Form.Group>
        </Form.Row>
      )
    })
  }

  render() {
    if (!this.state.friends) {
      return (
        <div> loading </div>
      )
    }

    return (
      <div className="App">
        <div className='container-fluid' >
          <input id='user-search' type='text' onChange={this.handleSearch} placeholder='search users'/>
          <div> Friend Requests </div>
          {this.renderPendingRuests(this.state.pendingRequests)}
          <br></br>
          <div> Your Friends </div>
          {this.renderFriends(this.state.friends)}
        </div>
      </div>
    )
  }

}

export default ViewFriends