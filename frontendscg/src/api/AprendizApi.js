import axios from 'axios';

export const getAprendizAllApi = () => axios.get('http://localhost:8080/api/aprendiz/listar');
export const getAprendizApi = (codigo) => axios.get(`http://localhost:8080/api/aprendiz/${codigo}`);
export const createAprendizApi = (data) => axios.post('http://localhost:8080/api/aprendiz', data);
export const updateAprendizApi = (codigo, data) => axios.put(`http://localhost:8080/api/aprendiz/actualizar/${codigo}`, data);
export const deleteAprendizApi = (codigo) => axios.delete(`http://localhost:8080/api/aprendiz/${codigo}`);
export const getAprendizQRApi = (codigo) =>
    axios.get(`http://localhost:8080/api/aprendiz/generarQR/${codigo}`, {
      responseType: 'blob'
    });