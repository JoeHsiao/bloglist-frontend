import axios from 'axios'
const baseUrl = '/api/blogs'

const getFormattedToken = token => {
  return `Bearer ${token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({ title, author, url, token }) => {
  const config = {
    headers: { Authorization: getFormattedToken(token) }
  }
  const response = await axios.post(baseUrl, { title, author, url }, config)
  return response.data
}

export default { getAll, create }