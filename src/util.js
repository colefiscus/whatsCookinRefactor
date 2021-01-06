function getData(api) {
  return fetch(api)
    .then(response => response.json())
    .then(data => data)
}

export default getData();
