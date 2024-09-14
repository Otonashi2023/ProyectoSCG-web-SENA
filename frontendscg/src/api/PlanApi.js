import axios from 'axios';

export const getPlanAllApi = () => axios.get('http://localhost:8080/api/plan/listar');
export const getPlanApi = (codigo) => axios.get(`http://localhost:8080/api/plan/${codigo}`);
export const createPlanApi = (data) => axios.post('http://localhost:8080/api/plan', data);
export const updatePlanApi = (codigo, data) => axios.put(`http://localhost:8080/api/plan/actualizar/${codigo}`, data);
export const deletePlanApi = (codigo) => axios.delete(`http://localhost:8080/api/plan/${codigo}`);