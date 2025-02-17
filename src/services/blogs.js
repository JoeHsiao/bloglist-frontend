import axios from 'axios'
const baseUrl = '/api/blogs'

let formattedToken = null

const setToken = token => {
  formattedToken = `Bearer ${token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({ title, author, url }) => {
  const config = {
    headers: { Authorization: formattedToken }
  }
  const response = await axios.post(baseUrl, { title, author, url }, config)
  return response.data
}

const update = async (blogObj) => {
  const id = blogObj.id
  console.log('fronend send', blogObj)
  const response = await axios.put(`${baseUrl}/${id}`, blogObj)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, setToken, update, remove }