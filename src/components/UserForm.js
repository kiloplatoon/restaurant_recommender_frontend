import React from 'react';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const UserForm = () => {
  return (
    <div>
      <div className='authForm'>
        <Form style={{textAlign: 'left'}}>
          <Form.Row>
            <Form.Group as={Col} controlId="user1">
              <Form.Label>User 1</Form.Label>
              <Form.Control type="text" placeholder="John" />
            </Form.Group>

            <Form.Group as={Col} controlId="user2">
              <Form.Label>User 2</Form.Label>
              <Form.Control type="text" placeholder="Jane" />
            </Form.Group>
          </Form.Row>

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