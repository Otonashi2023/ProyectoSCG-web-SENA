import { getAsistenciaAllApi, getAsistenciaApi, createAsistenciaApi, updateAsistenciaApi, deleteAsistenciaApi } from "@/api/AsistenciaApi";

const state = {
  asistencia:{
    codigo: null,
    fecha: '',
    aprendiz: null,
  },
  asistencias:[],
};

const getters = {
  getAsistencia: (state) => state.asistencia,
  getAsistencias: (state) => state.asistencias,
};

const mutations = {
  setAsistencia(state, data) {
    state.asistencia = data;
  },
  setAsistencias(state, data){
    state.asistencias = data;
  },
  clearAsistencia(state) {
    state.asistencia = {
        codigo: null,
        fecha: '',
        aprendiz: null,
    };
  },
  clearAsistencias(state) {
    state.asistencias = [];
  },
};

const actions = {
  async consultarAllAsistencias({ commit }) {
    try {
      const response = await getAsistenciaAllApi();
      commit('setAsistencias', response.data);
    } catch (error) {
      console.error("Error consultar all Asistencias:", error);
    }
  },
  async consultarAsistencia({ commit }, codigo) {
    try {
      const response = await getAsistenciaApi(codigo);
      commit('setAsistencia', response.data);
    } catch (error) {
      console.error("Error consultar Asistencia", error);
    }
  },
  async guardarAsistencia({ commit }, data) {
    try {
      const response = await createAsistenciaApi(data);
      commit('setAsistencia', response.data);
    } catch (error) {
      console.error("Error guardar Asistencia:", error);
    }
  },
  async actualizarAsistencia({ commit }, { codigo, data }) {
    try {
      const response = await updateAsistenciaApi(codigo, data);
      commit('setAsistencia', response.data);
    } catch (error) {
      console.error("Error actualizar Asistencia:", error);
    }
  },
  async eliminarAsistencias({ commit }, codigo) {
    try {
      await deleteAsistenciaApi(codigo);
      commit('clearAsistencia');
    } catch (error) {
      console.error("Error eliminar Asistencia:", error);
    }
  },
  limpiarAsistencia({commit}){
    commit('clearAsistencia');
  },
  limpiarAsistencias({commit}){
    commit('clearAsistencias');
  }

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
