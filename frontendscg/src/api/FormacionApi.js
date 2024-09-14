import axios from 'axios';

export const getFormacionAllApi = () => axios.get('http://localhost:8080/api/formacion/listar');
export const getFormacionApi = (codigo) => axios.get(`http://localhost:8080/api/formacion/${codigo}`);
export const createFormacionApi = (data) => axios.post('http://localhost:8080/api/formacion', data);
export const updateFormacionApi = (codigo, data) => axios.put(`http://localhost:8080/api/aprediz/formacion/${codigo}`, data);
export const deleteFormacionApi = (codigo) => axios.delete(`http://localhost:8080/api/formacion/${codigo}`);