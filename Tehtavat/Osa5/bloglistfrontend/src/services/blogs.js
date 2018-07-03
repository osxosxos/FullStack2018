import axios from 'axios'

let token = null

const baseUrl = '/api/blogs'

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async (id, blogToBeDeleted) => {

  // Tähän asti toimii, blogToBeDeleted on se mikä pitääkin!
  // Works so far, blogToBeDeleted is as it should be!

  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, blogToBeDeleted, config)
  return response.data
}

export default { getAll, create, like, setToken, remove }