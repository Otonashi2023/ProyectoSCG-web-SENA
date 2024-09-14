<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Planes</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormPlan @leave="salir" ref="componenteForm" @callMetodoN="callMetodoN"/></div>
            <div v-show="listar"><TablaPlan ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormPlan from '@/components/formularios/FormPlan.vue';
import TablaPlan from '@/components/tablas/TablaPlan.vue'
import { mapActions } from 'vuex';

export default{
    name:'PlanView',
    components:{
        FormPlan,
        TablaPlan
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
        ...mapActions(['limpiarNombre','limpiarRetorno2','limpiarDatoact2','limpiarDato4','limpiarPlan','limpiarDato9']),
        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
        irAformulario(){
            this.cambiar();
            this.limpiarDatos();
            this.$refs.componenteForm.cerrar();
        },
        salir(){
            this.formulario=false;
            this.listar=true;
            this.limpiarDatos();
            this.$refs.componente.obtenerPlanes();
        },
        read(value){
            this.cambiar();
            this.$refs.componenteForm.read(value);
        },
        update(value){
            this.cambiar();
            this.$refs.componenteForm.update(value);
        },
        tabla(){
            this.$refs.componenteForm.cerrar();
        },
        callMetodoN(){
            this.$refs.componente.callMetodoN();
        },
        inData(){
            this.cambiar();
            this.limpiarRetorno2();
            this.$refs.componenteForm.variar();
        },
        limpiarDatos(){
            this.limpiarDato4();
            this.limpiarNombre();
            this.limpiarPlan();
            this.limpiarDato9();
            this.limpiarDatoact2();
        }
    },
}
</script>