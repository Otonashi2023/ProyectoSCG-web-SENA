import { getEjercicioAllApi, getEjercicioApi, createEjercicioApi, updateEjercicioApi, deleteEjercicioApi } from "@/api/EjercicioApi";

const state = {
  ejercicio: {
    codigo: null,
    nombre: {
      codigo: null,
      nombre: '',
    },
    tipoEjercicio: {
      codigo: null,
      nombre: '',
    },
    musculo: {
      codigo: null,
      nombre: '',
    },
    series: null,
    repeticiones: null,
    descanso: null,
  },
  ejercicios:[],
};

const getters = {
  getEjercicio: (state) => state.ejercicio,
  getEjercicios: (state) => state.ejercicios,
};

const mutations = {
  setEjercicio(state, {data}) {
    console.log('Estado antes de la mutación:', state.ejercicio);
    console.log('Datos recibidos:', data);
    state.ejercicios = {...state.ejercicio, ...data};
    console.log('Estado después de la mutación:', state.ejercicio);
  },
  setEjercicios(state, data){
    state.ejercicios = data;
  },
  clearEjercicios(state) {
    state.ejercicio = {
        codigo: null,
        nombre: null,
        tipoEjercicio: null,
        musculo: null,
        series: null,
        repeticiones: null,
        descanso: null,
    };
  },
};

const actions = {
  async consultarAllEjercicios({ commit }) {
    try {
      const response = await getEjercicioAllApi();
      commit('setEjercicios', response.data);
    } catch (error) {
      console.error("Error consultar all Ejercicios:", error);
    }
  },
  async consultarEjercicio({ commit }, codigo) {
    try {
      console.log('Estado antes de la mutación:', state.ejercicio);
      console.log('Datos recibidos:', codigo);
      const response = await getEjercicioApi(codigo);
      commit('setEjercicio', {data:response.data});
    } catch (error) {
      console.error("Error consultar Ejercicio", error);
    }
  },
  async guardarEjercicio({ commit }, data) {
    try {
      const response = await createEjercicioApi(data);
      commit('setEjercicio', response.data);
      alert('Ejercicio guardado con exito');
    } catch (error) {
      console.error("Error guardar Ejercicio:", error);
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
  async actualizarEjercicio({ commit }, { codigo, data }) {
    try {
      const response = await updateEjercicioApi(codigo, data);
      commit('setEjercicio', response.data);
    } catch (error) {
      console.error("Error actualizar Ejercicio:", error);
    }
  },
  async eliminarEjercicio({ commit }, codigo) {
    try {
      await deleteEjercicioApi(codigo);
      commit('clearEjercicio');
    } catch (error) {
      console.error("Error eliminar Ejercicio:", error);
    }
  },
  limpiarAprendiz({commit}){
    commit('clearEjercicio');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
