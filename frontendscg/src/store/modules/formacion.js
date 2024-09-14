import { getFormacionAllApi, getFormacionApi, createFormacionApi, updateFormacionApi, deleteFormacionApi } from "@/api/FormacionApi";

const state = {
  formacion:{
    codigo: null,
    nombre: '',
  },
  formaciones:[],
};

const getters = {
  getFormacion: (state) => state.formacion,
  getFormaciones: (state) => state.formaciones,
};

const mutations = {
  setFormacion(state, data) {
    state.formacion = {...data};
  },
  setFormaciones(state, data){
    state.formaciones = data;
  },
  clearFormacion(state) {
    state.formacion = {
        codigo: null,
        nombre: '',
    };
  },
};

const actions = {
  async consultarAllFormaciones({ commit }) {
    try {
      const response = await getFormacionAllApi();
      commit('setFormaciones', response.data);
    } catch (error) {
      console.error("Error consultar all formaciones:", error);
    }
  },
  async consultarFormacion({ commit }, codigo) {
    try {
      const response = await getFormacionApi(codigo);
      commit('setFormacion', response.data);

    } catch (error) {
      console.error("Error consultar formacion", error);
    }
  },
  async guardarFormacion({ commit }, data) {
    try {
      const response = await createFormacionApi(data);
      commit('setFormacion', response.data);
      alert('formacion guardado con exito');
    } catch (error) {
      console.error("Error guardar formacion:", error);
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
  async actualizarFormacion({ commit }, { codigo, data }) {
    try {
      const response = await updateFormacionApi(codigo, data);
      commit('setFormacion', response.data);
    } catch (error) {
      console.error("Error actualizar formacion:", error);
    }
  },
  async eliminarFormacion({ commit }, codigo) {
    try {
      await deleteFormacionApi(codigo);
      commit('clearFormacion');
    } catch (error) {
      console.error("Error eliminar formacion:", error);
    }
  },
  addFormacion({commit}, data){
    commit('setFormacion', data);
  },
  limpiarFormacion({commit}){
    commit('clearFormacion');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
