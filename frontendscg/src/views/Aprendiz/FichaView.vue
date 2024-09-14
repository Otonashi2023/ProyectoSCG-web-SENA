<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Fichas</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormFicha @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaFicha ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormFicha from '@/components/formularios/FormFicha.vue';
import TablaFicha from '@/components/tablas/TablaFicha.vue'
import { mapActions } from 'vuex';

export default{
    name:'FichaView',
    components:{
        FormFicha,
        TablaFicha
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
        ...mapActions('formacion',['limpiarFormacion']),
        ...mapActions('ficha',['limpiarFicha']),
        ...mapActions(['limpiarRetorno2','limpiarDatoact2']),
        
        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
        irAformulario(){
            this.limpiarDatos();
            this.cambiar();
            this.$refs.componenteForm.cargarDatos();
        },
        salir(){
            this.limpiarDatos();
            this.formulario=false;
            this.listar=true;
            this.$refs.componente.obtenerFichas();
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
            this.limpiarFormacion();
            this.limpiarFicha();           
            this.limpiarDatoact2();
        }
    },
}
</script>