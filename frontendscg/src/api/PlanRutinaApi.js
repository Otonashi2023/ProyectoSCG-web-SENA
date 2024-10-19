import axios from 'axios';

export const getPlanRutinaAllApi = () => axios.get('http://localhost:8080/api/planrutina/listar');
export const getPlanRutinaApi = (codigo) => axios.get(`http://localhost:8080/api/planrutina/${codigo}`);
export const createPlanRutinaApi = (data) => axios.post('http://localhost:8080/api/planrutina', data);
export const updatePlanRutinaApi = (codigo, data) => axios.put(`http://localhost:8080/api/planrutina/actualizar/${codigo}`, data);
export const deletePlanRutinaApi = (codigo) => axios.delete(`http://localhost:8080/api/planrutina/${codigo}`);