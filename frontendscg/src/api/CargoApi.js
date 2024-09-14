import axios from 'axios';

export const getCargoAllApi = () => axios.get('http://localhost:8080/api/cargo/listar');
export const getCargoApi = (codigo) => axios.get(`http://localhost:8080/api/cargo/${codigo}`);
export const createCargoApi = (data) => axios.post('http://localhost:8080/api/cargo', data);
export const updateCargoApi = (codigo, data) => axios.put(`http://localhost:8080/api/cargo/actualizar/${codigo}`, data);
export const deleteCargoApi = (codigo) => axios.delete(`http://localhost:8080/api/cargo/${codigo}`);