import { getPersonalAllApi, getPersonalApi, createPersonalApi, updatePersonalApi, deletePersonalApi } from "@/api/PersonalApi";

const state = {
  personal:{
    codigo: null,
    persona: null,
    cargo: null,
  },
  personalAll:[],
  idPersonal: null,
};

const getters = {
  getPersonal: (state) => state.personal,
  getPersonalAll: (state) => state.personalAll,
  getIdPersonal: (state) => state.idPersonal,
};

const mutations = {
  setPersonal(state, data) {
    state.personal = {...data};
  },
  setPersonalAll(state, data){
    state.personalAll = data;
  },
  clearPersonal(state) {
    state.personal = {
        codigo: null,
        persona: null,
        cargo: null,
    };
  },
  changePersonal(state, {data}){
    state.personal = {
      ...state.personal,
      ...data
    };
  },
  clearCodigo(state) {
    state.personal.codigo = null;
  },
  setIdPersonal(state, data){
    state.idPersonal = data;
  }
};

const actions = {
  async consultarPersonalAll({ commit }) {
    try {
      const response = await getPersonalAllApi();
      commit('setPersonalAll', response.data);
    } catch (error) {
      console.error("Error consultar all PersonalAll:", error);
    }
  },
  async consultarPersonal({ commit }, codigo) {
    try {
      const response = await getPersonalApi(codigo);
      commit('setPersonal', response.data);
    } catch (error) {
      console.error("Error consultar Personal:", error);
    }
  },
  async guardarPersonal({ commit }, data) {
    try {
      const response = await createPersonalApi(data);
      commit('setPersonal', response.data);
      alert('registrado exitosamente');
    } catch (error) {
      console.error("Error guardar Personal:", error);
    }
  },
  async actualizarPersonal({ commit }, { codigo, data }) {
    console.log('desde el modulo el actualizar personal codigo: ', codigo);
    console.log('desde el modulo el actualizar personal data: ', data);
    try {
      const response = await updatePersonalApi(codigo, data);
      commit('setPersonal', response.data);
    } catch (error) {
      console.error("Error actualizar Personal:", error);
    }
  },
  async eliminarPersonal({ commit }, codigo) {
    try {
      await deletePersonalApi(codigo);
      commit('clearPersonal');
    } catch (error) {
      console.error("Error eliminar Personal:", error);
    }
  },
  addPersonal({commit}, data){
    commit('setPersonal', data);
  },
  limpiarCodigoPersonal({commit}){
    commit('clearCodigo')
  },
  limpiarPersonal({commit}){
    commit('clearPersonal');
  },
  altPersonal({commit}, data){
    commit('changePersonal', data);
  },
  saveIdPersonal({commit}, data){
    commit('setIdPersonal', data);    
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
