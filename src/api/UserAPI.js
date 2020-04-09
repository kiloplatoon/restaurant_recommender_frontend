const url = 'http://localhost:8000/'

const login = (userObject) => {
  return fetch (`${url}api/auth/login/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userObject)
  }).then(resp => resp.json())
}

const signup = (userObject) => {
  return fetch (`${url}api/auth/signup/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userObject)
  }).then(resp => resp.json())
}

const getLoggedInUser = (token) => {
  return fetch(`${url}api/auth/user/`, {
    header: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}

export default {
  login, getLoggedInUser, signup,
}