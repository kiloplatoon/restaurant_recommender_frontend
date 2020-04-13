import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ViewProfile from './profile_components/ViewProfile'
import EditProfile from './profile_components/EditProfile'
// Fake User object for testing
const fakeuser = {
  email: 'fakeUser@email.com',
  first_name: 'TEST',
  last_name: 'TEST',
  username: 'fakeuser123'
}

// Fake UserProfile object for testing
const userProfile = {
  username: fakeuser.username,
  phone_number: '(123)456-7890',
  email: fakeuser.email,
  friends: [
    'Sammy', 'George', 'Sarah'
  ],
  first_name: fakeuser.first_name,
  last_name: fakeuser.last_name
}


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


const Profile = (props) => {

  const classes = useStyles();


  let user
  if (props.token) {
    user = props.user
  } else {
    user = userProfile
  }

  const renderFriends = () => {
    return userProfile.friends.map((friend, index) => {
    return <ul key={index} onClick={() => {
      console.log(userProfile.friends[index])
    }}> 
      {friend} 
    </ul>
    })
  }

  const handleEditClick = async (evt) => {
    evt.preventDefault()
    console.log('Go to EDIT PROFILE page')
  }


 return (
  <>
  {
    !props.isLoggedIn 
    ?
    <Redirect to='/login' /> 
    :  
    <div className='authForm'>
      <h3>{user.username} <Avatar id='profile-image' className={classes.large} >{`${user.first_name[0]} ${user.last_name[0]}`}</Avatar> </h3>
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
          <Form.Label>Phone number: {userProfile.phone_number}</Form.Label>
        </Form.Group>
        <Form.Group controlId='friends'>
          <Form.Label>Friends</Form.Label>
          <div>{renderFriends()}</div>
        </Form.Group>
        <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'><Link id='profile-link' to="/editprofile">Edit</Link></Button>
      </Form>
    </div>
  }
  </>
);
};

export default Profile;