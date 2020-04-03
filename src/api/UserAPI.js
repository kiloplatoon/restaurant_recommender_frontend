const url = 'http://localhost:8000/'

const login = (userObject) => {
  return fetch (`${url}token-auth/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userObject)
  }).then(resp => resp.json())
}

const signup = (userObject) => {
  return fetch (`${url}api/users/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userObject)
  }).then(resp => resp.json())
}

const getLoggedInUser = (token) => {
  return fetch(`${url}api/current_user/`, {
    header: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`
    }
  })
}

export default {
  login, getLoggedInUser, signup,
}