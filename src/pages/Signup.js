import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
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
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control required type='email' placeholder='user@email.com' />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId='first_name'>
              <Form.Label>First Name</Form.Label>
              <Form.Control required type='text' placeholder='John' />
            </Form.Group>
            <Form.Group as={Col} controlId='last_name'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control required type='text' placeholder='Doe' />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Password' />
          </Form.Group>
          <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'>Submit</Button>
        </Form>
      </div>
    }
    </>
  );
};

export default Signup;