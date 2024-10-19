import { getPlanRutinaAllApi, getPlanRutinaApi, createPlanRutinaApi, updatePlanRutinaApi, deletePlanRutinaApi } from "@/api/PlanRutinaApi";

const state = {
  planRutina:{
    codigo: null,
    plan: null,
    rutina: null,
  },
  planRutinaAll:[],
};

const getters = {
  getPlanRutina: (state) => state.planRutina,
  getPlanRutinaAll: (state) => state.planRutinaAll,
};

const mutations = {
  setPlanRutina(state, data) {
    state.planRutina = {...data};
  },

  setPlanRutinaAll(state, data){
    state.planRutinaAll = data;
  },
  clearPlanRutina(state) {
    state.planRutina = {
        codigo: null,
        plan: null,
        rutina: null,
    };
  },
};

const actions = {
  async consultarPlanRutinaAll({ commit }) {
    try {
      const response = await getPlanRutinaAllApi();
      commit('setPlanRutinaAll', response.data);
    } catch (error) {
      console.log('listar: ',this.planRutinaAll);
      console.error("Error consultar all planRutina:", error);
    }
  },
  async consultarPlanRutina({ commit }, codigo) {
    try {
      const response = await getPlanRutinaApi(codigo);
      commit('setPlanRutina', response.data);
    } catch (error) {
      console.error("Error consultar planRutina", error);
    }
  },
  async guardarPlanRutina({ commit }, data) {
    try {
      const response = await createPlanRutinaApi(data);
      commit('setPlanRutina', response.data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error guardar planRutina:", error);
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
  async actualizarPlanRutina({ commit }, { codigo, data }) {
    try {
      const response = await updatePlanRutinaApi(codigo, data);
      commit('setPlanRutina', response.data);
    } catch (error) {
      console.error("Error actualizar planRutina:", error);
    }
  },
  async eliminarPlanRutina({ commit }, codigo) {
    try {
      await deletePlanRutinaApi(codigo);
      commit('clearPlanRutina');
    } catch (error) {
      console.error("Error eliminar planRutina:", error);
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
