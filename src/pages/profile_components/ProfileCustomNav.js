import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'



const ProfileCustomNav = ({user}) => {

  return (
    <div>
      <span>
      <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'><Link id='profile-link' to="/profile">Profile</Link></Button>
      <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'><Link id='profile-link' to="/profile/edit">Edit</Link></Button>
      <Button style={{marginTop: '1rem'}} className='btn btn-dark' type='submit'><Link id='profile-link' to="/profile/friends">Friends</Link></Button>
      </span>
    </div>
  );
};

export default ProfileCustomNav;
