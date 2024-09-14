import axios from 'axios';

export const getGeneroAllApi = () => axios.get('http://localhost:8080/api/genero/listar');
export const getGeneroApi = (codigo) => axios.get(`http://localhost:8080/api/genero/${codigo}`);
export const createGeneroApi = (data) => axios.post('http://localhost:8080/api/genero', data);
export const updateGeneroApi = (codigo, data) => axios.put(`http://localhost:8080/api/genero/actualizar/${codigo}`, data);
export const deleteGeneroApi = (codigo) => axios.delete(`http://localhost:8080/api/genero/${codigo}`);