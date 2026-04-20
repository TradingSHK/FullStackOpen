import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountry = (name) => {
    const url = `${baseUrl}/name/${name}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getAll = () => {
    return axios.get(`${baseUrl}/all`).then(response => response.data)
}

export default {
    getCountry: getCountry,
    getAll: getAll
}