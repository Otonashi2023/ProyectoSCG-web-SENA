import { getEjercicioAllApi, getEjercicioApi, createEjercicioApi, updateEjercicioApi, deleteEjercicioApi, uploadImgEjercicioApi} from "@/api/EjercicioApi";

const state = {
  ejercicio: {
    codigo: null,
    nombre:null,
    tipoEjercicio: null,
    musculo:null,
    series: null,
    repeticiones: null,
    descanso: null,
  },
  imagen: '',
  ejercicios:[],
};

const getters = {
  getEjercicio: (state) => state.ejercicio,
  getEjercicios: (state) => state.ejercicios,
  //imagen:(state) => state.ejercicio.imagen,
};

const mutations = {
  setEjercicio(state, data) {
    state.ejercicio = data;
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
  setImagen(state, imagen){
    state.imagen= imagen;

  },
  clearImagen(state){
    console.log("Limpiando imagen. Estado actual de imagen:", state.imagen);
    state.imagen = '';
    console.log("Estado después de limpiar imagen:", state.imagen);
  }
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
      const response = await getEjercicioApi(codigo);
      commit('setEjercicio', response.data);
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
  async subirImagenEjercicio({commit}, {codigo, formData}){
    try{
      const response = await uploadImgEjercicioApi(codigo, formData);
      commit('setImagen', response.data.imagen);
    } catch(error){
      console.error("Error al subir la imagen:", error);
    }
  },

  limpiarImagenEjercicio({commit}){
    commit('clearImagen');
  },
  limpiarEjercicio({commit}){
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
