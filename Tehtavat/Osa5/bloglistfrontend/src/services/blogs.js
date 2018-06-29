import axios from 'axios'

let token = null

const baseUrl = '/api/blogs'

const setToken = (newToken) => {
  console.log('new token set')
  token = `bearer ${newToken}`
  console.log('new toke is ', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  console.log('token: ', token)
  console.log('newBlog: ', newBlog)
  const config = {
    headers: { 'Authorization': token }
  }

  console.log('config:', config)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, create, setToken }