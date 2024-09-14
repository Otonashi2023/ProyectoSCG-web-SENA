const state = {
    metodos: {}
};

const mutations = {
    setMetodo(state, { key, metodo }){
        state.metodos[key] = metodo;
      },
      clearMetodo(state, key){
        delete state.metodos[key];
      },
      clearAllMetodos(state){
        state.metodos = {};
      },
};

const actions = {
    registrarMetodo({commit}, { key, metodo }){
        console.log('este es el metodo que intento guardar: ', {key,metodo});
        alert('Hola aqui en registrar metodo desde utils');
        commit('setMetodo', { key, metodo });
      },
      limpiarMetodo({commit}, key){
        commit('clearMetodo', key);
      },
      limpiarTodosLosMetodos({commit}){
        commit('clearAllMetodos');
      },
      callMetodo({state}, key){
        console.log('Claves disponibles:', Object.keys(state.metodos));
        console.log('Intentando llamar al método con clave:', key);
        const metodo = state.metodos[key];
        if(metodo){
          metodo();
        }
        else{
          console.error('Metodo con clave `${key}`no encontrado');
        }
      },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
  }