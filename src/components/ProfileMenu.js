import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'



const ProfileMenu = ({user}) => {

  return (
    <Dropdown >
      <Dropdown.Toggle varient='success' id='profile-menu'>
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu id='profile-items'>
        <Link id='profile-link' to="/profile">Profile</Link><br></br>
        <Link id='profile-link' to="/home">Home</Link><br></br>
        <Link id='profile-link' to="/start">Start Search</Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;
