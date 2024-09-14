import axios from 'axios';

export const getPersonalAllApi = () => axios.get('http://localhost:8080/api/personal/listar');
export const getPersonalApi = (codigo) => axios.get(`http://localhost:8080/api/personal/${codigo}`);
export const createPersonalApi = (data) => axios.post('http://localhost:8080/api/personal', data);
export const updatePersonalApi = (codigo, data) => axios.put(`http://localhost:8080/api/personal/actualizar/${codigo}`, data);
export const deletePersonalApi = (codigo) => axios.delete(`http://localhost:8080/api/personal/${codigo}`);