import axios from 'axios';

export const getUsuarioAllApi = () => axios.get('http://localhost:8080/api/usuario/listar');
export const getUsuarioApi = (codigo) => axios.get(`http://localhost:8080/api/usuario/${codigo}`);
export const createUsuarioApi = (data) => axios.post('http://localhost:8080/api/usuario', data);
export const updateUsuarioApi = (codigo, data) => axios.put(`http://localhost:8080/api/usuario/actualizar/${codigo}`, data);
export const deleteUsuarioApi = (codigo) => axios.delete(`http://localhost:8080/api/usuario/${codigo}`);