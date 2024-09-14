import axios from 'axios';

export const getFichaAntropoAllApi = () => axios.get('http://localhost:8080/api/fichaantropo/listar');
export const getFichaAntropoApi = (codigo) => axios.get(`http://localhost:8080/api/fichaantropo/${codigo}`);
export const createFichaAntropoApi = (data) => axios.post('http://localhost:8080/api/fichaantropo', data);
export const updateFichaAntropoApi = (codigo, data) => axios.put(`http://localhost:8080/api/fichaantropo/actualizar/${codigo}`, data);
export const deleteFichaAntropoApi = (codigo) => axios.delete(`http://localhost:8080/api/fichaantropo/${codigo}`);