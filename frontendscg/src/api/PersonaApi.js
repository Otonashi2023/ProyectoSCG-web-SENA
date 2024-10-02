import axios from 'axios';

export const getPersonaAllApi = () => axios.get('http://localhost:8080/api/persona/listar');
export const getPersonaApi = (codigo) => axios.get(`http://localhost:8080/api/persona/${codigo}`);
export const createPersonaApi = (data) => axios.post('http://localhost:8080/api/persona', data);
export const updatePersonaApi = (codigo, data) => axios.put(`http://localhost:8080/api/persona/actualizar/${codigo}`, data);
export const deletePersonaApi = (codigo) => axios.delete(`http://localhost:8080/api/persona/${codigo}`);
export const uploadImgPersonaApi = (codigo, formData) => axios.post(`http://localhost:8080/api/persona/upload/${codigo}`, formData,{
    headers:{
        'Content-Type': 'multipart/form-data'
    }
});