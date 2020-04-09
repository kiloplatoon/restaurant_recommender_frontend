import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom';


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





const EditProfile = (props) => {
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
    console.log('Todo: SEND DATA TO BACKEND AND RETURN TO PROFILE PAGE')
    
  }


  return (
    <>
    {
      // props.isLoggedIn
      // ?
      // <Redirect to='/home' />
      // :
      <div className='authForm'>
        <h3>{user.email}</h3>
        <Form className='container' style={{textAlign: 'left'}} onSubmit={handleEditClick}>
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
          <Form.Group controlId='phonenumber'>
            <Form.Label>Phone number: </Form.Label>
            <Form.Control type='text' placeholder={userProfile.phone_number} />
          </Form.Group>
          <Form.Group controlId='friends'>
            <Form.Label>Friends</Form.Label>
            <div>{renderFriends()}</div>
          </Form.Group>
          <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'>Submit</Button>
        </Form>
      </div>
    }
    </>
  );
};

export default EditProfile;