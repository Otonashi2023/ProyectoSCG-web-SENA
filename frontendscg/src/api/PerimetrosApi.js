import axios from 'axios';

export const getPerimetrosAllApi = () => axios.get('http://localhost:8080/api/perimetros/listar');
export const getPerimetrosApi = (codigo) => axios.get(`http://localhost:8080/api/perimetros/${codigo}`);
export const createPerimetrosApi = (data) => axios.post('http://localhost:8080/api/perimetros', data);
export const updatePerimetrosApi = (codigo, data) => axios.put(`http://localhost:8080/api/perimetros/actualizar/${codigo}`, data);
export const deletePerimetrosApi = (codigo) => axios.delete(`http://localhost:8080/api/perimetros/${codigo}`);