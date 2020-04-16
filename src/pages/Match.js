import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const GOOGLE = 'AIzaSyCIMSvsOOa6OO7520NUVMCuHTb6F2SA7IY'

const Match = (props) => {

  
  return (
    <div className='container' id='matchBox'>
      Hello.
      {/* <h1 id='matched'>Matched</h1>
      <iframe width="100%" height="100%" frameborder="0" style={{border:'0'}}
        src={`https://www.google.com/maps/embed/v1/place?q=${props.name}%2C%20${props.zipcode}&key=${GOOGLE}`} allowfullscreen></iframe>
      <Button className='btn btn-dark' style={{background: 'transparent'}}>
        <Link to='/start' style={{
          color: '#fff', fontFamily: "Rochester", padding: '1rem', width: '300', height: 'auto'
        }}>
          Go Again?
        </Link>
      </Button> */}
    </div>
  );
};

export default Match;