import { getTipoDocumentoAllApi, getTipoDocumentoApi, createTipoDocumentoApi, updateTipoDocumentoApi, deleteTipoDocumentoApi } from "@/api/TipoDocumentoApi";

const state = {
  tipoDocumento:{
    codigo: null,
    nombre: '',
  },
  tipoDocumentoAll:[],
};

const getters = {
    getTipoDocumento: (state) => state.tipoDocumento,
    getTipoDocumentoAll: (state) => state.tipoDocumentoAll,
};

const mutations = {
    setTipoDocumento(state, data) {
    state.tipoDocumento = {...data};
  },
  setTipoDocumentoAll(state, data){
    state.tipoDocumentoAll = data;
  },
  clearTipoDocumento(state) {
    state.tipoDocumento = {
        codigo: null,
        nombre: '',
    };
  },
};

const actions = {
  async consultarTipoDocumentoAll({ commit }) {
    try {
      const response = await getTipoDocumentoAllApi();
      commit('setTipoDocumento', response.data);
    } catch (error) {
      console.error("Error consultar all tipoDocumento:", error);
    }
  },
  async consultarTipoDocumento({ commit }, codigo) {
    try {
      const response = await getTipoDocumentoApi(codigo);
      commit('setTipoDocumento', response.data);
    } catch (error) {
      console.error("Error consultar tipoDocumento", error);
    }
  },
  async guardarTipoDocumento({ commit }, data) {
    try {
      const response = await createTipoDocumentoApi(data);
      commit('setTipoDocumento', response.data);
      alert('tipoDocumento guardado con exito');
    } catch (error) {
      console.error("Error guardar tipoDocumento:", error);
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
  async actualizarTipoDocumento({ commit }, { codigo, data }) {
    try {
      const response = await updateTipoDocumentoApi(codigo, data);
      commit('setTipoDocumento', response.data);
    } catch (error) {
      console.error("Error actualizar tipoDocumento:", error);
    }
  },
  async eliminarTipoDocumento({ commit }, codigo) {
    try {
      await deleteTipoDocumentoApi(codigo);
      commit('clearTipoDocumento');
    } catch (error) {
      console.error("Error eliminar tipoDocumento:", error);
    }
  },
  limpiarTipoDocumento({commit}){
    commit('clearTipoDocumento');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
