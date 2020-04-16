const url = 'http://localhost:8000/'


// LOGIN
const login = (userObject) => {
  console.log(userObject)
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("username", userObject.username);
  formdata.append("password", userObject.password);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return fetch("http://127.0.0.1:8000/api/auth/login/", requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}


// SIGNUP
const signup = (userObject) => {
  var myHeaders = new Headers();
  console.log(userObject)
  var formdata = new FormData();
  formdata.append("username", userObject.username);
  formdata.append("email", userObject.email);
  formdata.append("first_name", userObject.first_name);
  formdata.append("last_name", userObject.last_name);
  formdata.append("password", userObject.password);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return fetch("http://127.0.0.1:8000/api/auth/signup/", requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));

}


// GET LOGGED IN USER with TOKEN
const getLoggedInUser = (token) => {

  return fetch(`${url}api/auth/profiles`, {
    header: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

// GET ALL USERPROFILES
const getProfiles = () => {
  let myHeaders = new Headers()
  return fetch(`${url}api/auth/profiles/`, {
    header: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(result => {
    return result
  })
  .catch(error => console.log('error', error));
}

// EDIT USER PROFILE
const editProfile = (userObject, token) => {
  console.log(userObject)
  console.log(token)

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  
  

  
  // request options for profile update
  let profileFormdata = new FormData();
  profileFormdata.append('user', userObject.id)
  profileFormdata.append("phone_number", userObject.phone_number);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: profileFormdata,
    redirect: 'follow'
  };
  fetch(`${url}api/auth/profile/${userObject.id}/`, requestOptions)
    .then(response => response.json())
    .then(result => (result))
    .catch(error => console.log('error', error));
  


  // request options for user update
  var userFormdata = new FormData();
  userFormdata.append('id', userObject.id)
  userFormdata.append("username", userObject.username);
  userFormdata.append("email", userObject.email);
  userFormdata.append("first_name", userObject.first_name);
  userFormdata.append("last_name", userObject.last_name);
  userFormdata.append("password", userObject.password);

  console.log(userFormdata)

  requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: userFormdata,
    redirect: 'follow'
  };
  fetch(`${url}api/auth/user/${userObject.id}/`, requestOptions)
    .then(response => response.json())
    .then(result => (result))
    .catch(error => console.log('error', error));

  console.log(userFormdata)
}

// GET USER PROFILE
const getProfile = (userID, token) => {
  console.log(userID)
  console.log(token)

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'Get',
    headers: myHeaders,
    redirect: 'follow'
  };
  let profile = fetch(`${url}api/auth/profile/${userID}/`, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));


  let user = fetch(`${url}api/auth/user/${userID}/`, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));

  let data = profile
  return (data)
}

// GET USER PROFILE
const getUser = (userID, token) => {
  console.log(userID)
  console.log(token)

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'Get',
    headers: myHeaders,
    redirect: 'follow'
  };

  let user = fetch(`${url}api/auth/user/${userID}/`, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));

  let data = user
  return (data)
}


// ACCEPT FRIEND REQUEST
const acceptFriendRequest = (from_user, to_user) => {
  console.log('accepting')
  console.log(`Making friend request from ${from_user} to ${to_user}`)
  // create the body
  let myHeaders = new Headers();
  let formdata = new FormData()
  formdata.append('to_user', to_user)
  formdata.append('from_user', from_user)
  formdata.append('accepted_status', true)

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }

  return fetch(`${url}api/auth/friends/${from_user}/`, requestOptions)
    .then(response => response)
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));
}


// SEND FRIEND REQUEST 
const sendFriendRequest = (from_user, to_user) => {
  console.log(`Making friend request from ${from_user} to ${to_user}`)
  // create the body
  let myHeaders = new Headers();
  let formdata = new FormData()
  formdata.append('to_user', to_user)
  formdata.append('from_user', from_user)

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }

  return fetch(`${url}api/auth/friends/${from_user}/`, requestOptions)
    .then(response => response)
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));
  
}

// GET FRIEND REQUESTS
const getFriendRequests = (user_pk) => {
  console.log('Getting Requests')

  return fetch(`${url}api/auth/friends/${user_pk}/`)
    .then(response => response)
    .then(result => {
      console.log(result)
      return result
    })
    .catch(error => console.log('error', error));
}


const startSession = (user_one, user_two, user_likes, apiData, zipcode) => {
  console.log('CREATING NEW SESSION')
  var formdata = new FormData();
  formdata.append("user_one", user_one);
  formdata.append("user_two", user_two);
  formdata.append("user_likes", `{${user_likes}}`);
  formdata.append('apiData', JSON.stringify(apiData))
  formdata.append("zipcode", zipcode);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  return fetch("http://127.0.0.1:8000/api/auth/session/", requestOptions)
    .then(response => response.text())
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));
}

const checkForSession = (userID) => {
  console.log(userID)
  console.log('CHECKING FOR SESSION')

  var formdata = new FormData();

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return fetch(`http://127.0.0.1:8000/api/auth/session/${userID}/`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      return result
    })
    .catch(error => console.log('error', error));
}


export default {
  login, signup, getLoggedInUser, editProfile, getProfiles, getProfile, getUser, sendFriendRequest, getFriendRequests, acceptFriendRequest, startSession, checkForSession
}