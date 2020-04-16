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
          <Link to='/start'>
            <img id='logo' src={require('../images/dinnr2.png')} alt='logo'/>
          </Link>
        </div>
        <div>
        </div>
      </div>
    }
    </div>
  );
};

export default Home;
