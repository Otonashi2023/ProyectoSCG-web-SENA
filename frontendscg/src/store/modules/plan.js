import { getPlanAllApi, getPlanApi, createPlanApi, updatePlanApi, deletePlanApi } from "@/api/PlanApi";

const state = {
  plan:{
    codigo: null,
    tipoPlan: null,
    meses: null,
  },
  planes:[],
};

const getters = {
  getPlan: (state) => state.aprendizPlan,
  getPlanes: (state) => state.aprendizPlanAll,
};

const mutations = {
  setPlan(state, data) {
    if (data && typeof data === 'object') {
      console.log('data en mutacion: ', data);
      state.plan = { ...data };  // Esto debería funcionar si data es un objeto
      console.log('plan: ', state.plan);
    } else {
      console.error('Data no es un objeto válido:', data);
    }
  },
  setPlanes(state, data){
    state.planes = data;
  },
  clearPlan(state) {
    state.plan = {
        codigo: null,
        tipoPlan: null,
        meses: null,
    };
  },
};

const actions = {
  async consultarPlanes({ commit }) {
    try {
      const response = await getPlanAllApi();
      commit('setPlanes', response.data);
    } catch (error) {
      console.log('listar: ',this.planes);
      console.error("Error consultar all planes:", error);
    }
  },
  async consultarPlan({ commit }, codigo) {
    try {
      console.log('codigo: ', codigo);
      const response = await getPlanApi(codigo);
      alert('miga');
      console.log('response: ', response.data);
      commit('setPlan', response.data);
    } catch (error) {
      console.error("Error consultar plan", error);
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
  async guardarPlan({ commit }, data) {
    try {
      const response = await createPlanApi(data);
      commit('setPlan', response.data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error guardar plan:", error);
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
  async actualizarPlan({ commit }, { codigo, data }) {
    try {
      const response = await updatePlanApi(codigo, data);
      commit('setPlan', response.data);
    } catch (error) {
      console.error("Error actualizar plan:", error);
    }
  },
  async eliminarzPlan({ commit }, codigo) {
    try {
      await deletePlanApi(codigo);
      commit('clearPlan');
    } catch (error) {
      console.error("Error eliminar plan:", error);
    }
  },
  limpiarPlan({commit}){
    commit('clearPlan');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
