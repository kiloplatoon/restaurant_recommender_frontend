import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UserForm = (props) => {
  return (
    <div>
      <div className='authForm'>
        <Form style={{textAlign: 'left'}} onSubmit={props.getRestaurants}>
          <h1 className='h1'>Where should we search?</h1>
          <Form.Group controlId="zipcode">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control type='text' placeholder="60603" />
          </Form.Group>
          <Button className='btn btn-dark'>Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;