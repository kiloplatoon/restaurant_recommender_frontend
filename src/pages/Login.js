import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = (props) => {
  return (
    <div>
      {
      props.isLoggedIn
      ?
      <Redirect to='/home' />
      :
      <div className='authForm'>
        <h3>Login</h3>
        <Form className='container' style={{textAlign: 'left'}} onSubmit={props.handleLogin}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control required type='email' placeholder='user@email.com' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Password' />
          </Form.Group>
          <Button className='btn btn-dark' type='submit'>Submit</Button>
          <span style={{float: 'right'}}>
            New User? &nbsp;
            <Button className='btn btn-dark'><Link to='/signup' style={{color: '#fff'}}>Sign Up</Link></Button>
          </span>
        </Form>
      </div>
      }
    </div>
  );
};

export default Login;