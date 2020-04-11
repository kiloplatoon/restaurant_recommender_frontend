const url = 'http://localhost:8000/'

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
  .then(result => result)
  .catch(error => console.log('error', error));
}

// EDIT USER PROFILE
const editProfile = (userObject, token) => {
  console.log(userObject)
  console.log(token)
  
  var userFormdata = new FormData();
  userFormdata.append('id', userObject.id)
  userFormdata.append("username", userObject.username);
  userFormdata.append("email", userObject.email);
  userFormdata.append("first_name", userObject.first_name);
  userFormdata.append("last_name", userObject.last_name);
  userFormdata.append("user", userObject.id);

  let profileFormdata = new FormData();
  profileFormdata.append("phone_number", userObject.phone_number);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);


  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: userFormdata,
    redirect: 'follow'
  };

  // fetch(`${url}api/auth/profile/${userObject.id}/`, requestOptions)
  //   .then(response => response.json())
  //   .then(result => (result))
  //   .catch(error => console.log('error', error));
  

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: formdata,
  //   redirect: 'follow'
  // };

  // return fetch("http://127.0.0.1:8000/api/auth/signup/", requestOptions)
  // .then(response => response.json())
  // .then(result => result)
  // .catch(error => console.log('error', error));
  console.log(userFormdata)
}

export default {
  login, signup, getLoggedInUser, editProfile, getProfiles
}