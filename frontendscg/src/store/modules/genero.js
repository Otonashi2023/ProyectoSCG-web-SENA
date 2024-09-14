import { getGeneroAllApi, getGeneroApi, createGeneroApi, updateGeneroApi, deleteGeneroApi } from "@/api/GeneroApi";

const state = {
    genero:{
        codigo: null,
        nombre: '',
    },
    generos:[],
};

const getters = {
    getGenero: (state) => state.genero,
  getGeneros: (state) => state.generos,
};

const mutations = {
  setGenero(state, data) {
    state.genero = {...data};
  },
  setGeneros(state, data){
    state.generos = data;
  },
  clearGenero(state) {
    state.genero = {
        codigo: null,
        nombre: '',
    };
  },
};

const actions = {
  async consultarAllGeneros({ commit }) {
    try {
      const response = await getGeneroAllApi();
      commit('setGeneros', response.data);
    } catch (error) {
      console.error("Error consultar all generos:", error);
    }
  },
  async consultarGenero({ commit }, codigo) {
    try {
      const response = await getGeneroApi(codigo);
      commit('setGenero', response.data);
    } catch (error) {
      console.error("Error consultar genero", error);
    }
  },
  async guardarGenero({ commit }, data) {
    try {
      const response = await createGeneroApi(data);
      commit('setGenero', response.data);
      alert('genero guardado con exito');
    } catch (error) {
      console.error("Error guardar genero:", error);
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
  async actualizarGenero({ commit }, { codigo, data }) {
    try {
      const response = await updateGeneroApi(codigo, data);
      commit('setGenero', response.data);
    } catch (error) {
      console.error("Error actualizar Genero:", error);
    }
  },
  async eliminarGenero({ commit }, codigo) {
    try {
      await deleteGeneroApi(codigo);
      commit('clearGenero');
    } catch (error) {
      console.error("Error eliminar genero:", error);
    }
  },
  limpiarGenero({commit}){
    commit('clearGenero');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
