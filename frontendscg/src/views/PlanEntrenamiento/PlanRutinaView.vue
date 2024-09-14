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
            <div v-show="formulario"><FormPlanRutina @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaPlanRutina ref="componente" @ById="read" @change="update" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormPlanRutina from '@/components/formularios/FormPlanRutina.vue';
import TablaPlanRutina from '@/components/tablas/TablaPlanRutina.vue';
import { mapActions } from 'vuex';

export default{
    name:'PlanRutinaView',
    components:{
        FormPlanRutina,
        TablaPlanRutina
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
        ...mapActions('variables',['limpiarArrayR','limpiarRutinas']),
        ...mapActions(['limpiarDato5','limpiarDato6','limpiarPlan','limpiarRutina','limpiarDato9','limpiarRetorno','limpiarNombre','limpiarRetorno2','limpiarDato4','limpiarRetorno3','limpiarDato8']),

        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
        irAformulario(){
            this.cambiar();
            this.limpiarDatos();
        },
        salir(){
            this.formulario=false;
            this.listar=true;
            this.limpiarDatos();
            this.$refs.componente.obtenerPlanRutinasYEnriquecer();
        },
        read(value1,value2){
            this.cambiar();
            this.$refs.componenteForm.read(value1,value2);
        },
        update(value){
            this.cambiar();
            this.$refs.componenteForm.update(value);
        },
        inData(){
            this.cambiar();
            this.limpiarRetorno3();
            //this.$refs.componenteForm.variar();
        },
        refresh(){
            this.$refs.componente.obtenerPlanRutinasYEnriquecer();
        },
        limpiarDatos(){
            this.limpiarDato4();
            this.limpiarDato5();
            this.limpiarDato6();
            this.limpiarDato8();
            this.limpiarDato9();
            this.limpiarNombre();
            this.limpiarPlan();
            this.limpiarRutina();
            this.limpiarRetorno3();
            this.limpiarRutinas();
            this.limpiarArrayR();
        },
    },
}
</script>