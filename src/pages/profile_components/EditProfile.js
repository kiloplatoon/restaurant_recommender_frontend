import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


// Fake UserProfile object for testing
const fakeuser = {
  email: 'fakeUser@email.com',
  first_name: 'TEST',
  last_name: 'TEST',
  username: 'fakeuser123'
}
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





const EditProfile = (props) => {

  let getLoggedInUser

  let user
  if (props.token) {
    user = props.user
    getLoggedInUser = props.getLoggedInUser
  } else {
    user = userProfile
    getLoggedInUser = () => {console.log('no')}
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
      password: evt.target.password.value,
    }

    console.log(newUserData)

    let response = await props.UserAPI.editProfile(newUserData, props.token)
    console.log(response)

    // Reload data and go back to profile component
    //  maybe do the getLoggedInUser
    
  }


  return (
    <div className='authForm'>
        <Form className='container' style={{textAlign: 'left'}} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='email'>
              <Form.Label>Email: </Form.Label>
              <Form.Control type='email' placeholder={user.email} />
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
            <Form.Label>Phone number: xxx-xxx-xxxx</Form.Label>
            <Form.Control type='text' pattern="^\d{3}-\d{3}-\d{4}$" placeholder={user.phone_number} />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='password' />
          </Form.Group>
          <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'> Submit </Button>
        </Form>
      </div>

  );
};

export default EditProfile;
