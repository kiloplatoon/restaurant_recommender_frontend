import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";




const ViewProfile = (props) => {

  let user = props.user
  

  const handleEditClick = async (evt) => {
    evt.preventDefault()
    console.log('Go to EDIT PROFILE page')
  }

  const renderFriends = () => {

    return user.friends.map((friend, index) => {
      // Create API call to get user 
      // let curFriend =  props.UserAPI.getUser(friend, props.token)
    return <ul key={index} onClick={() => {
      console.log(user.friends[index])
    }}> 
      {friend.username} 
    </ul>
    })
  }


  return (
    <div className='authForm'>
      <Form className='container' style={{textAlign: 'left'}} onSubmit={handleEditClick}>
        <Form.Row>
          <Form.Group as={Col} controlId='first_name'>
            <Form.Label>First name: {user.first_name}</Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId='last_name'>
            <Form.Label>Last name: {user.last_name}</Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId='phonenumber'>
          <Form.Label>Phone number: {user.phone_number}</Form.Label>
        </Form.Group>
        <Form.Group controlId='friends'>
          <Form.Label>Friends</Form.Label>
          <div>{renderFriends()}</div>
        </Form.Group>
      </Form>
    </div>

  );
};

export default ViewProfile;

