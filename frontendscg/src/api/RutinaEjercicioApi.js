import axios from 'axios';

export const getRutinaEjercicioAllApi = () => axios.get('http://localhost:8080/api/rutinaejercicio/listar');
export const getRutinaEjercicioApi = (codigo) => axios.get(`http://localhost:8080/api/rutinaejercicio/${codigo}`);
export const createRutinaEjercicioApi = (data) => axios.post('http://localhost:8080/api/rutinaejercicio', data);
export const updateRutinaEjercicioApi = (codigo, data) => axios.put(`http://localhost:8080/api/rutinaejercicio/actualizar/${codigo}`, data);
export const deleteRutinaEjercicioApi = (codigo) => axios.delete(`http://localhost:8080/api/rutinaejercicio/${codigo}`);