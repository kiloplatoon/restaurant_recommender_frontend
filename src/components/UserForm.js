import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'




const UserForm = (props) => {

  const renderDropDown = () => {
    if (props) {
      return props.user.friends.map((friend, index) => {
        return (
          <option key={friend.id}> 
            {friend.username} 
          </option>
        )
      })

    }
    return <option>Test</option>

  }



  return (
    <div>
      <div className='authForm'>
        <Form style={{textAlign: 'left'}} onSubmit={props.getRestaurants}>
          <h1 className='h1'>Where should we search?</h1>
          <Form.Group controlId="zipcode">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control type='text' placeholder="60603" />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Select a friend</Form.Label>
            <Form.Control as='select'>
              {renderDropDown()}
            </Form.Control>
          </Form.Group>
          <Button className='btn btn-dark' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;