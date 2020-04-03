import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom';

const Signup = (props) => {
  return (
    <>
    {
      props.isLoggedIn
      ?
      <Redirect to='/home' />
      :
      <div className='authForm'>
        <h3>Sign Up</h3>
        <Form className='container' style={{textAlign: 'left'}} onSubmit={props.handleSignup}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control required type='text' placeholder='Username' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Password' />
          </Form.Group>
          <Button className='btn btn-dark' type='submit'>Submit</Button>
        </Form>
      </div>
    }
    </>
  );
};

export default Signup;