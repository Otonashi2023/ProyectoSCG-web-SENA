import { getAprendizAllApi, getAprendizApi, createAprendizApi, updateAprendizApi, deleteAprendizApi, getAprendizQRApi } from "@/api/AprendizApi";

const state = {
  aprendiz:{
    codigo: null,
    restricMedicas: '',
    persona: null,
    ficha: null,
  },
  aprendices:[],
  qrImageUrl: null,
};

const getters = {
  getAprendiz: (state) => state.aprendiz,
  getAprendices: (state) => state.aprendices,
};

const mutations = {
  setAprendiz(state, data) {
    state.aprendiz = {...data};
  },
  setAprendices(state, data){
    state.aprendices = data;
  },
  setQRCodeImageUrl(state, url) {
    state.qrImageUrl = url;
  },
  clearCodigo(state){
    state.aprendiz.codigo = null;
  },
  clearAprendiz(state) {
    state.aprendiz = {
        codigo: null,
        restricMedicas: '',
        persona: null,
        ficha: null,
    };
  },
  clearAprendices(state) {
    state.aprendices = []
  },
  learQRCode(state) {
    state.qrImageUrl = null;
  }
};

const actions = {
  async consultarAllAprendices({ commit }) {
    try {
      const response = await getAprendizAllApi();
      commit('setAprendices', response.data);
    } catch (error) {
      console.error("Error consultar all Aprendices:", error);
    }
  },
  async consultarAprendiz({ commit }, codigo) {
    try {
      const response = await getAprendizApi(codigo);
      commit('setAprendiz', response.data);
    } catch (error) {
      console.error("Error consultar Aprendiz", error);
    }
  },
  async guardarAprendiz({ commit }, data) {
    try {
      const response = await createAprendizApi(data);
      commit('setAprendiz', response.data);
      alert('aprendiz guardado con exito');
    } catch (error) {
      console.error("Error guardar Aprendiz:", error);
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
  async actualizarAprendiz({ commit }, { codigo, data }) {
    try {
      const response = await updateAprendizApi(codigo, data);
      commit('setAprendiz', response.data);
    } catch (error) {
      console.error("Error actualizar Aprendiz:", error);
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
  async eliminarAprendiz({ commit }, codigo) {
    try {
      console.log('codigo para eliminar: ',codigo);
      await deleteAprendizApi(codigo);
      commit('clearAprendiz');
    } catch (error) {
      console.error("Error eliminar Aprendiz:", error);
    }
  },
  addAprendiz({commit}, data){
    commit('setAprendiz', data);
  },
  limpiarCodigoAprendiz({commit}){
    commit('clearCodigo');
  },
  limpiarAprendiz({commit}){
    commit('clearAprendiz');
  },
  limpiarAprendices({commit}){
    commit('clearAprendices');
  },
  async generarQRCode({ commit }, codigo) {
    try {
      const response = await getAprendizQRApi(codigo);
      const blob = response.data;
      
      const url = URL.createObjectURL(blob);
      commit('setQRCodeImageUrl', url);
    } catch (error) {
      console.error("Error generando QR Code:", error);
    }
  },

  limpiarQRCode({ commit }) {
    commit('clearQRCode');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
