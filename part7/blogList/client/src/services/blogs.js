import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { authorization: token }
  }
  const url = baseUrl.concat(`/${id}`)
  const response = await axios.put(url, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { authorization: token }
  }

  const url = baseUrl.concat(`/${id}`)
  const response = await axios.delete(url, config)
  return response.data
}

const addComment = async(id, existingObject, comment) => {
  const config = {
    headers: { authorization: token }
  }
  
  const payload = {
    author: existingObject.author,
    title: existingObject.title,
    url: existingObject.url,
    likes: existingObject.likes,
    comment: comment
  }

  const url = baseUrl.concat(`/${id}/comments`)
  const response = await axios.put(url, payload, config)
  return response.data
}

export default { getAll, create, setToken, clearToken, update, remove, addComment }