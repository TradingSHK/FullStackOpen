import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const getSingle = (curName) => {
    const request = axios.get(`${baseUrl}?name=${curName}`)
    return request.then(response => response.data)
} 


export default {
    create: create,
    getAll: getAll,
    deleteEntry:deleteEntry,
    update: update,
    getSingle: getSingle
}