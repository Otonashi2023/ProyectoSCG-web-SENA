const state = {
    nomEjercicio:{
        codigo: null,
        nombre: '',
    },
    nomEjercicios: [],
};

const mutations = {
    setnomEjercicio(state, data) {
        state.nomEjercicio = {...data};
    },
    setnomEjercicios(state, data){
        state.nomEjericicios = data;
    }
};

const actions = {
    listnomEjercicios({commit}, data){
        commit('setnomEjercicios', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}