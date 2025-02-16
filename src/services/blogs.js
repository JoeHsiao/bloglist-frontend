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

export default { getAll, create, setToken }