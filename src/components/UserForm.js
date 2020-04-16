import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UserForm = (props) => {
  return (
    <div>
      <div className='authForm'>
        <Form style={{textAlign: 'left'}} onSubmit={props.getRestaurants}>
          <Form.Group controlId="zipcode">
            <Form.Label><h5 className='formHeader'>Where should we search?</h5></Form.Label>
            <Form.Control type='text' placeholder="zipcode" />
          </Form.Group>
          <br />
          <br />
          <Form.Group controlId="username">
            <Form.Label><h5 className='formHeader'>Who do you want to dine with?</h5></Form.Label>
            <Form.Control type='text' placeholder="username" />
          </Form.Group>
          <Button className='btn btn-dark' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;