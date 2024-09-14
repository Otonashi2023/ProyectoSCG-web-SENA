import axios from 'axios';

export const getTipoDocumentoAllApi = () => axios.get('http://localhost:8080/api/tipodocumento/listar');
export const getTipoDocumentoApi = (codigo) => axios.get(`http://localhost:8080/api/tipodocumento/${codigo}`);
export const createTipoDocumentoApi = (data) => axios.post('http://localhost:8080/api/tipodocumento', data);
export const updateTipoDocumentoApi = (codigo, data) => axios.put(`http://localhost:8080/api/aprediz/tipodocumento/${codigo}`, data);
export const deleteTipoDocumentoApi = (codigo) => axios.delete(`http://localhost:8080/api/tipodocumento/${codigo}`);