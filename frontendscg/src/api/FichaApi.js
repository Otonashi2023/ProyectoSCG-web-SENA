import axios from 'axios';

export const getFichaAllApi = () => axios.get('http://localhost:8080/api/ficha/listar');
export const getFichaApi = (codigo) => axios.get(`http://localhost:8080/api/ficha/${codigo}`);
export const createFichaApi = (data) => axios.post('http://localhost:8080/api/ficha', data);
export const updateFichaApi = (codigo, data) => axios.put(`http://localhost:8080/api/ficha/actualizar/${codigo}`, data);
export const deleteFichaApi = (codigo) => axios.delete(`http://localhost:8080/api/ficha/${codigo}`);