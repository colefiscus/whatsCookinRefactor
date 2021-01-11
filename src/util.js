import User from './user';
import ingredientsData from "./data/ingredients"

function createRandomUser(users) {
  let userId = (Math.ceil(Math.random() * 49) + 1)
  let newUser = users.find(user => {
    return user.id === Number(userId);
  });
  let user = new User(userId, newUser.name, newUser.pantry, ingredientsData)
  return user
}

export const getUser = () => {
  return fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(users => createRandomUser(users))
}

export const postData = (api, body) => {
  return fetch(api, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

export const deleteData = (api, body) => {
  return fetch(api, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}
