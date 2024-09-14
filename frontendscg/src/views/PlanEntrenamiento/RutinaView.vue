<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Rutina</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormRutina @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaRutina ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormRutina from '@/components/formularios/FormRutina.vue';
import TablaRutina from '@/components/tablas/TablaRutina.vue'
import { mapActions } from 'vuex';

export default{
    name:'RutinaView',
    components:{
        FormRutina,
        TablaRutina
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
        ...mapActions(['limpiarNombre','limpiarRetorno2','limpiarDatoact2','limpiarDato4','limpiarRutina','limpiarDato8','limpiarDato6']),
        
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
            this.$refs.componente.obtenerRutinas();
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
        inData(){
            this.cambiar();
            this.limpiarRetorno2();
            this.$refs.componenteForm.variar();
        },
        limpiarDatos(){
            this.limpiarDato4();
            this.limpiarNombre();            
            //this.limpiarDato8();
            //this.limpiarDato6();
            this.limpiarRutina();
            this.limpiarDatoact2();
        }
    },
}
</script>