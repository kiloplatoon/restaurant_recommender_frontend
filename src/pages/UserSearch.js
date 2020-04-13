import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';




// for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    position: "absolute",
    
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));


const UserSearch = (props) => {

  const classes = useStyles();


  // let user
  // if (props.token) {
  //   user = props.user
  // } else {
  //   user = userProfile
  // }

  // const renderFriends = () => {
  //   return userProfile.friends.map((friend, index) => {
  //   return <ul key={index} onClick={() => {
  //     console.log(userProfile.friends[index])
  //   }}> 
  //     {friend} 
  //   </ul>
  //   })
  // }

  const handleEditClick = async (evt) => {
    evt.preventDefault()
    console.log('Go to EDIT PROFILE page')
  }


  return (
    <>
    {
      !props.isLoggedIn 
      ?
      <Redirect to='/login' /> 
      :  
      <div className='authForm'>
        TEST SEARCH
        {/* <h3>{user.username} <Avatar id='profile-image' className={classes.large} >{`${user.first_name[0]} ${user.last_name[0]}`}</Avatar> </h3> */}
        
      </div>
    }
    </>
  );
};

export default UserSearch;