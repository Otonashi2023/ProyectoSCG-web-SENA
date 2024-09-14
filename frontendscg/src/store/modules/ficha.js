import { getFichaAllApi, getFichaApi, createFichaApi, updateFichaApi, deleteFichaApi } from "@/api/FichaApi";


const state = {
    ficha:{
        codigo:null,
        numero:null,
        formacion:null,
    },
    fichas: [],
};

const getters = {
    getFicha: (state) => state.ficha,
    getFichas: (state) => state.fichas,
};

const mutations = {
    setFicha(state, data){
        state.ficha = {...data};
    },
    setFichas(state, data){
        state.fichas = data;
    },
    clearFicha(state){
        state.ficha = {
            codigo:null,
            numero:null,
            formacion:null,
        }
    }
};

const actions = {
    async consultarAllFichas({ commit }) {
        try {
          const response = await getFichaAllApi();
          commit('setFichas', response.data);
        } catch (error) {
          console.error("Error consultar all fichas:", error);
        }
      },
      async consultarFicha({ commit }, codigo) {
        try {
          const response = await getFichaApi(codigo);
          commit('setFicha', response.data);
        } catch (error) {
          console.error("Error consultar ficha", error);
        }
      },
      async guardarAFicha({ commit }, data) {
        try {
          const response = await createFichaApi(data);
          commit('setFicha', response.data);
          alert('ficha guardado con exito');
        } catch (error) {
          console.error("Error guardar ficha:", error);
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
      async actualizarFicha({ commit }, { codigo, data }) {
        try {
          const response = await updateFichaApi(codigo, data);
          commit('setFicha', response.data);
        } catch (error) {
          console.error("Error actualizar ficha:", error);
        }
      },
      async eliminarFicha({ commit }, codigo) {
        try {
          await deleteFichaApi(codigo);
          commit('clearFicha');
        } catch (error) {
          console.error("Error eliminar ficha:", error);
        }
      },

    addFicha({commit}, data){
        commit('setFicha', data);
    },
    limpiarFicha({commit}){
        commit('clearFicha');
    },   
};

export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
}