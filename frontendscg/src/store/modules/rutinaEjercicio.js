import { getRutinaEjercicioAllApi, getRutinaEjercicioApi, createRutinaEjercicioApi, updateRutinaEjercicioApi, deleteRutinaEjercicioApi } from "@/api/RutinaEjercicioApi";

const state = {
  rutinaEjercicio:{
    codigo: null,
    rutina: null,
    ejercicio: null,
  },
  rutinaEjercicioAll:[],
};

const getters = {
  getRutinaEjercicio: (state) => state.rutinaEjercicio,
  getRutinaEjercicioAll: (state) => state.rutinaEjercicioAll,
};

const mutations = {
  setRutinaEjercicio(state, data) {
    state.rutinaEjercicio = {...data};
  },

  setRutinaEjercicioAll(state, data){
    state.rutinaEjercicioAll = data;
  },

  clearRutinaEjercicio(state) {
    state.rutinaEjercicio = {
        codigo: null,
        rutina: null,
        ejercicio: null,
    };
  },
};

const actions = {
  async consultarRutinaEjercicioAll({ commit }) {
    try {
      const response = await getRutinaEjercicioAllApi();
      commit('setRutinaEjercicioAll', response.data);
    } catch (error) {
      console.log('listar: ',this.rutinaEjercicioAll);
      console.error("Error consultar all rutinaEjercicioAll:", error);
    }
  },
  async consultarRutinaEjercicio({ commit }, codigo) {
    try {
      const response = await getRutinaEjercicioApi(codigo);
      commit('setRutinaEjercicio', response.data);
    } catch (error) {
      console.error("Error consultar rutinaEjercicio", error);
    }
  },
  async guardarRutinaEjercicio({ commit }, data) {
    try {
      const response = await createRutinaEjercicioApi(data);
      commit('setRutinaEjercicio', response.data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error guardar rutinaEjercicio:", error);
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
  async actualizarRutinaEjercicio({ commit }, { codigo, data }) {
    try {
      const response = await updateRutinaEjercicioApi(codigo, data);
      commit('setRutinaEjercicio', response.data);
    } catch (error) {
      console.error("Error actualizar rutinaEjercicio:", error);
    }
  },
  async eliminarRutinaEjercicio({ commit }, codigo) {
    try {
      await deleteRutinaEjercicioApi(codigo);
      commit('clearRutinaEjercicio');
    } catch (error) {
      console.error("Error eliminar rutinaEjercicio:", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
