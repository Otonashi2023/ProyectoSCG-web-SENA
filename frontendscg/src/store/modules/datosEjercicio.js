export default{
    namespaced: true,
    state:{
        nombreCode: null,
        tipoEjercicioCode: null,
        musculoCode: null,
        series: null,
        repeticiones:null,
        descanso:null,
    },
    getters:{
        getSeries:(state)=> state.series,
        getRepeticiones:(state)=> state.repeticiones,
        getDescanso:(state)=> state.descanso,
    },
    mutations:{
        setNombreCode(state, nuevodato){
            state.nombreCode= nuevodato;
        },
        clearNombreCode(state){
            state.nombreCode= null;
        },
        setTipoEjercicioCode(state, nuevodato){
            state.tipoEjercicioCode= nuevodato;
        },
        clearTipoEjercicioCode(state){
            state.tipoEjercicioCode= null;
        },
        setMusculoCode(state, nuevodato){
            state.musculoCode= nuevodato;
        },
        clearMusculoCode(state){
            state.musculoCode= null;
        },
        setSeries(state, nuevodato){
            state.series= nuevodato;
        },
        clearSeries(state){
            state.series= null;
        },
        setRepeticiones(state, nuevodato){
            state.repeticiones= nuevodato;
        },
        clearRepeticiones(state){
            state.repeticiones= null;
        },
        setDescanso(state, nuevodato){
            state.descanso= nuevodato;
        },
        clearDescanso(state){
            state.descanso= null;
        },
    },
    actions:{
        actualizarNombreCode({commit},nuevodato){
            commit('setNombreCode',nuevodato);
        },
        limpiarNombreCode({commit}){
            commit('clearNombreCode');
        },
        actualizarTipoEjercicioCode({commit},nuevodato){
            commit('setTipoEjercicioCode',nuevodato);
        },
        limpiarTipoEjercicioCode({commit}){
            commit('clearTipoEjercicioCode');
        },
        actualizarMusculoCode({commit},nuevodato){
            commit('setMusculoCode',nuevodato);
        },
        limpiarMusculoCode({commit}){
            commit('clearMusculoCode');
        },
        actualizarSeries({commit},nuevodato){
            commit('setSeries',nuevodato);
        },
        limpiarSeries({commit}){
            commit('clearSeries');
        },
        actualizarRepeticiones({commit},nuevodato){
            commit('setRepeticiones',nuevodato);
        },
        limpiarRepeticiones({commit}){
            commit('clearRepeticiones');
        },
        actualizarDescanso({commit},nuevodato){
            commit('setDescanso',nuevodato);
        },
        limpiarDescanso({commit}){
            commit('clearDescanso');
        },
    }
}