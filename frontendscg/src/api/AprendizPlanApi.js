import axios from 'axios';

export const getAprendizPlanAllApi = () => axios.get('http://localhost:8080/api/aprendizplan/listar');
export const getAprendizPlanApi = (codigo) => axios.get(`http://localhost:8080/api/aprendizplan/${codigo}`);
export const createAprendizPlanApi = (data) => axios.post('http://localhost:8080/api/aprendizplan', data);
export const updateAprendizPlanApi = (codigo, data) => axios.put(`http://localhost:8080/api/aprendizplan/actualizar/${codigo}`, data);
export const deleteAprendizPlanApi = (codigo) => axios.delete(`http://localhost:8080/api/aprendizplan/${codigo}`);