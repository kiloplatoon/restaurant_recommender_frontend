import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


const Profile = (props) => {
  console.log(props)
  const user = {
    first_name: 'Bob',
    last_name: 'Frank',
    email: 'bobbyfrank@email.com',
    username: 'bobbyfrankie',
    friends: ['Sammy', 'George', 'Sarah']
  }

  const renderFriends = () => {
    return <p>{user.friends}</p>
  }

  return (
    <div>
    {
      // !props.isLoggedIn 
      // ?
      // <Redirect to='/login' /> 
      // :  
      <div className='profile' id='profilePage'>
        <div>
          <h4 id='welcome'>Welcome {user.first_name} {user.last_name}!</h4>
        </div>
        <br></br>
        <div>
          Friends list:
          <div className='friendsList'>
            {renderFriends()}
          </div>
        </div>
      </div>
    }
    </div>
  );
};

export default Profile;