<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Rutinas</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormRutinaEjercicio @leave="salir" ref="componenteForm" @refresh="refresh"/></div>
            <div v-show="listar"><TablaRutinaEjercicio ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormRutinaEjercicio from '@/components/formularios/FormRutinaEjercicio.vue';
import TablaRutinaEjercicio from '@/components/tablas/TablaRutinaEjercicio.vue';
import { mapActions } from 'vuex';

export default{
    name:'RutinaEjercicioView',
    components:{
        FormRutinaEjercicio,
        TablaRutinaEjercicio
    },
    data(){
        return{
            formulario:false,
            listar:true,
        }
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        ...mapActions('variables',['limpiarEjercicios','limpiarArrayE']),
        ...mapActions(['limpiarDato6','limpiarDato7','limpiarRutina','limpiarDato8','limpiarRetorno','limpiarNombre','limpiarRetorno2','limpiarDato4','limpiarEjercicio']),

        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
        irAformulario(){
            this.cambiar();
            this.limpiarDatos();
            //this.$refs.componenteForm.cerrar();
        },
        salir(){
            this.formulario=false;
            this.listar=true;
            this.limpiarDatos();
            this.$refs.componente.obtenerRutinaEjercicios();
            this.$refs.componenteForm.agregarEjercicio();
        },
        read(value1,value2){
            this.cambiar();
            this.$refs.componenteForm.read(value1,value2);
        },
        update(value1,value2){
            this.cambiar();
            this.$refs.componenteForm.update(value1,value2);
        },/*
        tabla(){
            this.$refs.componenteForm.cerrar();
        },
        jumper(){
            this.$refs.componente.limpiarId();
        },*/
        inData(){
            this.cambiar();
            this.limpiarRetorno2();
            this.$refs.componenteForm.limpiarNombreEjercicio();
        },
        refresh(){
            this.$refs.componente.obtenerRutinaEjercicios();
        },

        limpiarDatos(){
            this.limpiarDato6();
            this.limpiarDato7();
            this.limpiarDato8();
            this.limpiarDato4();
            this.limpiarRutina();
            this.limpiarNombre();
            this.limpiarRetorno();
            this.limpiarRetorno2();
            this.limpiarEjercicios();
            this.limpiarEjercicio();
            this.limpiarArrayE();
        },
    },
}
</script>