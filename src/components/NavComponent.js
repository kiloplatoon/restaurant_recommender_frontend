import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavComponent = ({isLoggedIn, handleLogout}) => {
  return (
    <div className='container'>
      <Navbar expand='md' id='navbar'>
        <Navbar.Brand style={{color: '#fff'}} id='nav-brand'>
          <Link to='/' style={{color: '#fff'}}>Dinnr</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto justify-content-end'>
            {
              !isLoggedIn ?
              <Navbar.Text style={{color: '#fff'}}>
                <Link to='/login' style={{color: '#fff', paddingLeft: '1rem'}}>Login</Link>
              </Navbar.Text>
              :
              <Navbar.Text style={{color: '#fff'}}>
                <Link to='/login' style={{color: '#fff', paddingLeft: '1rem'}} onClick={handleLogout}>Logout</Link>
              </Navbar.Text>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>      
    </div>
  );
};

export default NavComponent;
