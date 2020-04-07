import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


const Home = (props) => {
  

  return (
    <div>
    {
      !props.isLoggedIn 
      ?
      <Redirect to='/login' /> 
      :  
      <div className='container' id='baseComp'>
        <div>
        <h4 id='welcome'>Welcome to</h4>
        </div>
        <div>
          <h1 id='brand'>Dinnr</h1>
        </div>
        <div>
          <Button className='btn btn-dark'><Link to='/start' style={{color: '#fff'}}>Begin</Link></Button>
        </div>
      </div>
    }
    </div>
  );
};

export default Home;
