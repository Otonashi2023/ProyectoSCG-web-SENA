export default{
    namespaced:true,

    state:{
        nombre: "",/*
        tipoEjercio: "",
        musculo: "",
        series: null,
        repeticiones: null,
        descanso: null,*/
        exercise:'',
        ejercicios:[],
        valor:null,
        arrayE:[],
        rutinaIn:null,
        rutinas:[],
        valor2:null,
        arrayR:[],

        datos:[],
        datos2:[],
        datos3:[],

        ejerciciosAll:[],
        groupFilter: [],
        rutinasAll:[],
        groupFilter2: [],

        activeM: false,
    },
    
    getters:{
        /*getNombre: (state) => state.nombre,
        getTipoEjercicio: (state) => state.tipoEjercicio,
        getMusculo: (state) => state.musculo,
        getSeries: (state) => state.series,
        getRepeticiones: (state) => state.repeticiones,
        getDescanso: (state) => state.descanso,*/
        getEjercicio: (state) => state.exercise,
        getEjercicios: (state) => state.ejercicios,
        getValor: (state) => state.valor,
        getArrayE: (state) => state.arrayE,
        getEjerciciosAll: (state) => state.ejerciciosAll,
    },
    
    mutations:{
        /*setEjercicios(state, data){
            state.nombre = data.nombre.nombre;
            state.tipoEjercicio = data.tipoEjercicio.nombre;
            state.musculo = data.musculo.nombre;
            state.series = data.series;
            state.repeticiones = data.repeticiones;
            state.descanso = data.descanso;
        },*/
        addEjerciciosAll(state, data){
            console.log('Data en addEjerciciosAll:', data);
            state.ejerciciosAll = data;
        },
        clearEjerciciosAll(state){
            state.ejerciciosAll = [];
        },
        addEjercicio(state){
            if(Array.isArray(state.ejercicios)){
                state.ejercicios = [state.exercise,...state.ejercicios];
            }
        },
        clearEjercicios(state){
            state.ejercicios = [];
        },
        updateEjercicio(state, ejercicio){
            state.exercise = ejercicio;
        },
        clearEjercicio(state){
            state.exercise = "";
        },
        removerEjercicio(state, codigo) {
            state.ejercicios = state.ejercicios.filter(ejercicio => ejercicio.codigo !== codigo);
          },
        addArrayE(state){
            if(Array.isArray(state.arrayE)){
                state.arrayE = [state.valor,...state.arrayE];
            }
        },
        clearArrayE(state){
            state.arrayE = [];
        },
        updateValor(state, valor){
            state.valor = valor;
        },
        clearValor(state){
            state.valor = null;
        },
        removerArrayE(state, codigo) {
            state.arrayE = state.arrayE.filter(ejercicio => ejercicio !== codigo);
        },


        addRutinasAll(state, data){
            console.log('Data en addRutinassAll:', data);
            state.rutinasAll = data;
        },
        clearRutinasAll(state){
            state.rutinasAll = [];
        },
        addRutina(state){
            if(Array.isArray(state.rutinas)){
                state.rutinas = [state.rutinaIn,...state.rutinas];
            }
        },
        clearRutinas(state){
            state.rutinas = [];
        },
        updateRutina(state, rutina){
            state.rutinaIn = rutina;
        },
        clearRutina(state){
            state.rutinaIn = "";
        },
        removerRutina(state, codigo) {
            console.log('ESTE ES EL CODIGO QUE ENTRA EN LA MUTACION: ',codigo);
            state.rutinas = state.rutinas.filter(rutina => rutina.rutina.codigo !== codigo);
            console.log('ESPERANDO EL CAMBIO: ',state.rutinas);
          },
        addArrayR(state){
            if(Array.isArray(state.arrayR)){
                state.arrayR = [state.valor2,...state.arrayR];
            }
        },
        clearArrayR(state){
            state.arrayR = [];
        },
        updateValor2(state, valor2){
            state.valor2 = valor2;
        },
        clearValor2(state){
            state.valor2 = null;
        },
        removerArrayR(state, codigo) {
            state.arrayR = state.arrayR.filter(rutina => rutina !== codigo);
        },


        updateDatos(state, datos){
            state.datos = datos;
        },
        clearDatos(state){
            state.datos = null;
        },
        updateDatos2(state, datos){
            state.datos2 = datos;
        },
        clearDatos2(state){
            state.datos2 = [];
        },
        updateDatos3(state, datos){
            state.datos3 = datos;
        },
        clearDatos3(state){
            state.datos3 = [];
        },
        /*clearEjercicios(state){
            state.nombre = "";
            state.tipoEjercicio = "";
            state.musculo ="";
            state.series = null;
            state.repeticiones =null;
            state.descanso = null;
        }*/
       setGroupFilter(state, data){
        state.groupFilter = data;        
       },
       clearGroupFilter(state){
        state.groupFilter = [];
       },
       setGroupFilter2(state, data){
        state.groupFilter2 = data;        
       },
       clearGroupFilter2(state){
        state.groupFilter2 = [];
       },

       setActiveM(state, data){
        state.activeM = data;        
       },
       clearActiveM(state){
        state.activeM = false;
       }

    },
    
    actions:{
        action({commit}, data){
            commit('addEjerciciosAll', data);
        },
        limpiarEjerciciosAll({commit}){
            commit('clearEjerciciosAll')
        },
        actionEjercicios({commit}){
            commit('addEjercicio');
        },  
        limpiarEjercicios({commit}){
            commit('clearEjercicios');
        }, 
        nuevoEjercicio({ commit }, ejercicio) {
            commit('updateEjercicio', ejercicio);
        },
        borrarEjercicio({commit}){
            commit('clearEjercicio');
        },
        quitarEjercicio({commit},codigo){
            commit('removerEjercicio', codigo);
        },
        actionArrayE({commit}){
            commit('addArrayE');
        },  
        limpiarArrayE({commit}){
            commit('clearArrayE');
        }, 
        nuevoValor({ commit }, valor) {
            commit('updateValor', valor);
        },
        borrarValor({commit}){
            commit('clearValor');
        },
        quitarArrayE({commit},codigo){
            commit('removerArrayE', codigo);
        },


        action2({commit}, data){
            commit('addRutinasAll', data);
        },
        limpiarRutinasAll({commit}){
            commit('clearRutinasAll')
        },
        actionRutinas({commit}){
            commit('addRutina');
        },  
        limpiarRutinas({commit}){
            commit('clearRutinas');
        }, 
        nuevaRutina({ commit }, rutina) {
            commit('updateRutina', rutina);
        },
        borrarRutina({commit}){
            commit('clearRutina');
        },
        quitarRutina({commit},codigo){
            commit('removerRutina', codigo);
        },
        actionArrayR({commit}){
            commit('addArrayR');
        },  
        limpiarArrayR({commit}){
            commit('clearArrayR');
        }, 
        nuevoValor2({ commit }, valor2) {
            commit('updateValor2', valor2);
        },
        borrarValor2({commit}){
            commit('clearValor2');
        },
        quitarArrayR({commit},codigo){
            commit('removerArrayR', codigo);
        },


        actionDatos({commit},datos){
            commit('updateDatos',datos);
        },
        limpiarDatos({commit}){
            commit('clearDatos');
        },
        actionDatos2({commit},datos2){
            commit('updateDatos2',datos2);
        },
        limpiarDatos2({commit}){
            commit('clearDatos2');
        },
        actionDatos3({commit},datos3){
            commit('updateDatos3',datos3);
        },
        limpiarDatos3({commit}){
            commit('clearDatos3');
        },

        actionGroupFilter({commit}, data){
            commit('setGroupFilter', data);
        },
        limpiarGroupFilter({commit}){
            commit('clearGroupFilter');
        },
        actionGroupFilter2({commit}, data){
            commit('setGroupFilter2', data);
        },
        limpiarGroupFilter2({commit}){
            commit('clearGroupFilter2');
        },
        actionActiveM({commit}, data){
            commit('setActiveM', data);
        },
        limpiarActiveM({commit}){
            commit('clearActiveM');
        }
    },
}