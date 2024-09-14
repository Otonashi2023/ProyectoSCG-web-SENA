import { getFichaAntropoAllApi, getFichaAntropoApi, createFichaAntropoApi, updateFichaAntropoApi, deleteFichaAntropoApi } from "@/api/FichaAntropometricaApi";

const state = {
  fichaAntropo:{
    codigo: null,
    numControl: null,
    fecha: '',
    altura: null,
    peso: null,
    imc: null,
    personal: null,
    genero: null,
    aprendiz: null,
  },
  fichaAntropoAll:[],
  estado: null,
};

const getters = {
  getFichaAntropo: (state) => state.fichaAntropo,
  getFichaAntropoAll: (state) => state.fichaAntropoAll,
};

const mutations = {
  setFichaAntropo(state, data) {
    state.fichaAntropo = data;
  },
  setFichaAntropoAll(state, data){
    state.fichaAntropoAll = data;
  },
  clearCodigo(state){
    state.fichaAntropo.codigo = null;
  },
  clearFichaAntropo(state) {
    state.fichaAntropo = {
        codigo: null,
        numControl: null,
        fecha: "",
        altura: null,
        peso: null,
        imc: null,
        personal: null,
        genero: null,
        aprendiz: null,
    };
  },
  setEstado(state, value){
    state.estado = value;
  },
  clearEstado(state){
    state.estado = null;
  },
};

const actions = {
  async consultarFichaAntropoAll({ commit }) {
    try {
      const response = await getFichaAntropoAllApi();
      commit('setFichaAntropoAll', response.data);
    } catch (error) {
      console.error("Error consultar all FichaAntropoAll:", error);
    }
  },
  async consultarFichaAntropo({ commit }, codigo) {
    try {
      const response = await getFichaAntropoApi(codigo);
      commit('setFichaAntropo', response.data);
    } catch (error) {
      console.error("Error consultar FichaAntropo:", error);
    }
  },
  async guardarFichaAntropo({ commit }, data) {
    try {
      console.log('DATA QUE LLEGA: ', data);
      const response = await createFichaAntropoApi(data);
      console.log('AQUI DESDE EL MODULO FICHA ANTROPO API: ', response.data);
      commit('setFichaAntropo', response.data);
    } catch (error) {
      console.error("Error guardar FichaAntropo:", error);
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
  async actualizarFichaAntropo({ commit }, { codigo, data }) {
    try {
      const response = await updateFichaAntropoApi(codigo, data);
      commit('setFichaAntropo', response.data);
    } catch (error) {
      console.error("Error actualizar FichaAntropo:", error);
    }
  },
  async eliminarFichaAntropo({ commit }, codigo) {
    try {
      await deleteFichaAntropoApi(codigo);
      commit('clearFichaAntropo');
    } catch (error) {
      console.error("Error eliminar FichaAntropo:", error);
    }
  },
  addFichaantropo({commit}, data){
    commit('setFichaAntropo', data);
  },
  limpiarCodigoFichaantropo({commit}){
    commit('clearCodigo');
  },
  limpiarFichaAntropo({commit}){
    commit('clearFichaAntropo');
  },
  addEstado({commit}, value){
    commit('setEstado', value);
  },
  limpiarEstado({commit}){
    commit('clearEstado');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
