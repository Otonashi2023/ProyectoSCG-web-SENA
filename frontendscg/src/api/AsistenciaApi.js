import axios from 'axios';

export const getAsistenciaAllApi = () => axios.get('http://localhost:8080/api/asistencia/listar');
export const getAsistenciaApi = (codigo) => axios.get(`http://localhost:8080/api/asistencia/${codigo}`);
export const createAsistenciaApi = (data) => axios.post('http://localhost:8080/api/asistencia', data);
export const updateAsistenciaApi = (codigo, data) => axios.put(`http://localhost:8080/api/asistencia/actualizar/${codigo}`, data);
export const deleteAsistenciaApi = (codigo) => axios.delete(`http://localhost:8080/api/asistencia/${codigo}`);