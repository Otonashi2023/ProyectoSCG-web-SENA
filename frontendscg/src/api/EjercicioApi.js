import axios from 'axios';

export const getEjercicioAllApi = () => axios.get('http://localhost:8080/api/ejercicio/listar');
export const getEjercicioApi = (codigo) => axios.get(`http://localhost:8080/api/ejercicio/${codigo}`);
export const createEjercicioApi = (data) => axios.post('http://localhost:8080/api/ejercicio', data);
export const updateEjercicioApi = (codigo, data) => axios.put(`http://localhost:8080/api/ejercicio/actualizar/${codigo}`, data);
export const deleteEjercicioApi = (codigo) => axios.delete(`http://localhost:8080/api/ejercicio/${codigo}`);
export const uploadImgEjercicioApi = (codigo, formData) => axios.post(`http://localhost:8080/api/ejercicio/upload/${codigo}`, formData,{
    headers:{
        'Content-Type': 'multipart/form-data'
    }
});