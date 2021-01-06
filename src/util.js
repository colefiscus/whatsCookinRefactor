const getData = (api) => {
  console.log("hot damn")
  return fetch(api)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

const postData = (api, body) => {
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

const deleteData = (api, body) => {
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

export default getData;
export default postData;
export default deleteData;
