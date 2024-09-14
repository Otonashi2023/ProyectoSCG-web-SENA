import { getPerimetrosAllApi, getPerimetrosApi, createPerimetrosApi, updatePerimetrosApi, deletePerimetrosApi } from "@/api/PerimetrosApi";

const state = {
    perimetros:{
      codigo: null,
      cabeza: null,
      cuello: null,
      brazoRelaz: null,
      brazoTenso: null,
      antebrazo: null,
      muñeca: null,
      torax: null,
      cintura: null,
      cadera: null,
      musloMax: null,
      musloMin: null,
      pamtorrillaMax: null,
      pantorrillaMin: null,
      fichaantropo: null,
    },
    perimetrosAll: [],
};

const getters = {
    getPerimetros: (state) => state.perimetros,
    getPerimetrosAll: (state) => state.perimetrosAll,
};

const mutations = {
    setPerimetros(state, data){
        state.perimetros = data;
    },
    setPerimetrosAll(state, data){
        state.perimetrosAll =data;
    },
    clearCodigo(state){
      state.perimetros.codigo = null;
    },
    clearPerimetros(state){
        state.perimetros = {
            codigo: null,
            cabeza: null,
            cuello: null,
            brazoRelaz: null,
            brazoTenso: null,
            antebrazo: null,
            muñeca: null,
            torax: null,
            cintura: null,
            cadera: null,
            musloMax: null,
            musloMin: null,
            pamtorrillaMax: null,
            pantorrillaMin: null,
            fichaantropo: null,
        };
    },
};

const actions = {
    async consultarPerimetrosAll({commit}){
        try{
            const response = await getPerimetrosAllApi();
            commit('setPerimetrosAll', response.data);
        } catch (error) {
            console.error("Error consultar all los perimetros:", error);
        } 
    },
    async consultarPerimetros({ commit }, codigo) {
        try {
          const response = await getPerimetrosApi(codigo);
          commit('setPerimetros', response.data);
        } catch (error) {
          console.error("Error consultar Periemtros", error);
        }
      },
    async guardarPerimetros({commit}, data){
        try{
          console.log('DATA ANTES DE IR A LA API:',data);
          const response = await createPerimetrosApi(data);
          commit('setPerimetros', response.data);
          alert("Los datos fueron registrados con éxito");
          console.log('datos perimetricos despues del action: ', state.fichaAntropo);
          console.log('response: ', response.data);
        } catch (error) {
            console.error("Error guardar Perimetros:", error);
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
    async actualizarPerimetros({ commit }, { codigo, data }) {
        try {
          const response = await updatePerimetrosApi(codigo, data);
          commit('setPerimetros', response.data);
        } catch (error) {
          console.error("Error actualizar Perimetros:", error);
        }
      },
      async eliminarPerimetros({ commit }, codigo) {
        try {
          await deletePerimetrosApi(codigo);
          commit('clearPerimetros');
        } catch (error) {
          console.error("Error eliminar Perimetros:", error);
        }
      },
      addPerimetros({commit}, data){
        commit('setPerimetros', data);
      },
      limpiarCodigoPerimetros({commit}){
        commit('clearCodigo');
      },
      limpiarPerimetros({commit}){
        commit('clearPerimetros');              
      }
};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
