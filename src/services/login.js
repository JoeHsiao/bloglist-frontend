import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  const response = await axios.post(baseUrl, {
    'username': username,
    'password': password
  })
  return response.data
}

export default { login }
