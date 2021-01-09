export const getData = (api) => {
  return fetch(api)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
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
