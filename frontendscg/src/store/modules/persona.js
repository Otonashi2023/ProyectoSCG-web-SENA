import { getPersonaAllApi, getPersonaApi, createPersonaApi, updatePersonaApi, deletePersonaApi, uploadImgPersonaApi } from "@/api/PersonaApi";

const state = {
  persona:{
    codigo: null,
    nombres: '',
    apellidos: '',
    cedula: null,
    celular: null,
    cotacto: '',
    celularAlt: null,
    correo: '',
    tipoDocumento:{
      codigo: null,
      nombre: '',
    },
    nombre:"",
    foto:null,
  },
  personas:[],
};

const getters = {
  getPersona: (state) => state.persona,
  getPersonas: (state) => state.personas,
  nombreTD: (state) => state.persona?.tipoDocumento?.nombre,
  foto: (state) => state.persona?.foto,
};

const mutations = {
  setPersona(state, data) {
    state.persona = {...data};
  },
  setPersonas(state, data){
    state.personas = data;
  },
  clearCodigo(state) {
    state.persona.codigo = null;
  },
  clearPersona(state) {
    state.persona = {
      codigo: null,
      nombres: '',
      apellidos: '',
      cedula: null,
      celular: null,
      contacto: '',
      celularAlt: null,
      correo: '',
      tipoDocumento: null,
      nombre: '',
      foto:null,
    };
  },
  setFoto(state, foto){
    state.persona.foto = foto;
  },
  clearFoto(state){
    state.persona.foto = null;
  }
};

const actions = {
  async consultarAllPersonas({ commit }) {
    try {
      const response = await getPersonaAllApi();
      commit('setPersonas', response.data);
    } catch (error) {
      console.error("Error consultar all Personas:", error);
    }
  },
  async consultarPersona({ commit }, codigo) {
    try {
      console.log('mirando el codigo que llega al modulo persona:',codigo)
      const response = await getPersonaApi(codigo);
      commit('setPersona', response.data);
      console.log('desde modulo persona:',response.data);
    } catch (error) {
      console.error("Error consultar Persona:", error);
    }
  },
  async guardarPersona({ commit }, data) {
    try {
      const response = await createPersonaApi(data);
      commit('setPersona', response.data);
    } catch (error) {
      console.error("Error guardar Persona:", error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("Error request:", error.request);
      } else {
        // Algo pasó al configurar la solicitud que provocó un error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  },
  async actualizarPersona({ commit }, { codigo, data }) {
    try {
      const response = await updatePersonaApi(codigo, data);
      commit('setPersona', response.data);
    } catch (error) {
      console.error("Error actualizar Persona:", error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("Error request:", error.request);
      } else {
        // Algo pasó al configurar la solicitud que provocó un error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  },
  async eliminarPersona({ commit }, codigo) {
    try {
      await deletePersonaApi(codigo);
      commit('clearPersona');
    } catch (error) {
      console.error("Error eliminar Persona:", error);
      alert('no se puede eliminar, verifique si el instructor ha sido asignado a una ficha antropometrica');
    }
  },

  async subirFotoPersona({commit}, {codigo, formData}){
    try{
      const response = await uploadImgPersonaApi(codigo, formData);
      commit('setFoto', response.data.foto);
    } catch(error){
      console.error("Error al subir la imagen:", error);
    }
  },

  limpiarFotoPersona({commit}){
    commit('clearFoto');
  },

  addPersona({commit}, data){
    commit('setPersona', data);
  },
  limpiarCodigoPersona({commit}){
    commit('clearCodigo')
  },
  limpiarPersona({commit}){
    commit('clearPersona');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
