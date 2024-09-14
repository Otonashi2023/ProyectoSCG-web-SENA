import { getCargoAllApi, getCargoApi, createCargoApi, updateCargoApi, deleteCargoApi } from "@/api/CargoApi";

const state = {
    cargo:{
    codigo: null,
    nombre: '',
  },
  cargos:[],
};

const getters = {
  getCargo: (state) => state.cargo,
  getCargos: (state) => state.cargos,
};

const mutations = {
  setCargo(state, data) {
    state.cargo = {...data};
  },
  setCargos(state, data){
    state.cargos = data;
  },
  clearCargo(state) {
    state.cargo = {
        codigo: null,
        nombre: '',
    };
  },
};

const actions = {
  async consultarAllCargos({ commit }) {
    try {
      const response = await getCargoAllApi();
      commit('setCargos', response.data);
    } catch (error) {
      console.error("Error consultar all cargos:", error);
    }
  },
  async consultarCargo({ commit }, codigo) {
    try {
      const response = await getCargoApi(codigo);
      commit('setCargo', response.data);
    } catch (error) {
      console.error("Error consultar cargo", error);
    }
  },
  async guardarCargo({ commit }, data) {
    try {
      const response = await createCargoApi(data);
      commit('setCargo', response.data);
      alert('cargo guardado con exito');
    } catch (error) {
      console.error("Error guardar cargo:", error);
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
  async actualizarCargo({ commit }, { codigo, data }) {
    try {
      const response = await updateCargoApi(codigo, data);
      commit('setCargo', response.data);
    } catch (error) {
      console.error("Error actualizar cargo:", error);
    }
  },
  async eliminarCargo({ commit }, codigo) {
    try {
      await deleteCargoApi(codigo);
      commit('clearCargo');
    } catch (error) {
      console.error("Error eliminar Cargo:", error);
    }
  },
  limpiarCargo({commit}){
    commit('clearCargo');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
