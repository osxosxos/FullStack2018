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

const updatePerson = (changedPerson) => {   
    return axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson);
}


export default {getAllPersons, postNewPerson, removePerson, updatePerson}