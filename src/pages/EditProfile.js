import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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



const EditProfile = (props) => {

  const classes = useStyles();

  let user
  if (props.token) {
    user = props.user
  } else {
    user = userProfile
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    
    for(let i=0; i<evt.target.length-1; i++) {
      // if not changed keep the current data  
      if (evt.target[i].value == '') {
        evt.target[i].value = evt.target[i].placeholder
      }
    }

    let newUserData = {
      id: user.id,
      username: user.username,
      email: evt.target.email.value,
      first_name: evt.target.first_name.value,
      last_name: evt.target.last_name.value,
      phone_number: evt.target.phone_number.value,
    }

    //SEND USER2 DATA TO BACKEND TO UPDATE PROFILE

    // cheated.. looped through entire list of user profiles
    let allUsers = await props.UserAPI.getProfiles()
    let thisProfile = false
    for (let i in allUsers) {
      if (allUsers[i].username == user.username) {
        thisProfile = allUsers[i]
      }
    }
    newUserData.key = thisProfile.id
    console.log(newUserData)

    let response = await props.UserAPI.editProfile(newUserData, props.token)
    console.log(response)

  }


 
  return (
    <>
    {
      // props.isLoggedIn
      // ?
      // <Redirect to='/home' />
      // :
      <div className='authForm'>
        <h3>{user.username} <Avatar id='profile-image' className={classes.large} >{`${user.first_name[0]} ${user.last_name[0]}`}</Avatar> </h3>
        <Form className='container' style={{textAlign: 'left'}} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='email'>
              <Form.Label>Email: </Form.Label>
              <Form.Control type='text' placeholder={user.email} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='first_name'>
              <Form.Label>First name: </Form.Label>
              <Form.Control type='text' placeholder={user.first_name} />
            </Form.Group>
            <Form.Group as={Col} controlId='last_name'>
              <Form.Label>Last name: </Form.Label>
              <Form.Control type='text' placeholder={user.last_name} />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId='phone_number'>
            <Form.Label>Phone number: </Form.Label>
            <Form.Control type='text' placeholder={userProfile.phone_number} />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='password' />
          </Form.Group>
          <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'>Submit</Button>
        </Form>
      </div>
    }
    </>
  );
};

export default EditProfile;