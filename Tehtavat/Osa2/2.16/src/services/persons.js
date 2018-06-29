import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
}

const postNewPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const removePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
} 

export default {getAllPersons, postNewPerson, removePerson}