<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Instructores</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormPersonal @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaPersonal ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData" @verModal="verModal"/></div>
            <div v-if="modal"><ModalPersonal @verModal="verModal"/></div>
        </div>
    </div>
</template>

<script>
import FormPersonal from '@/components/formularios/FormPersonal.vue';
import ModalPersonal from '@/components/modal/ModalPersonal.vue';
import TablaPersonal from '@/components/tablas/TablaPersonal.vue';
import { mapActions } from 'vuex';

export default{
    name:'PersonalView',
    components:{
        FormPersonal,
        TablaPersonal,
        ModalPersonal,
    },
    data(){
        return{
            formulario:false,
            listar:true,
            modal:false,
        }
    },
    computed:{
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        ...mapActions('tipoDocumento',['limpiarTipoDocumento']),
        ...mapActions('persona',['limpiarPersona']),
        ...mapActions('cargo',['limpiarCargo']),
        ...mapActions('personal',['limpiarPersonal']),
        ...mapActions('usuario',['limpiarUsuario']),
        ...mapActions(['limpiarDatoact2','limpiarRetorno2']),

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
            this.$refs.componente.consultarAllUsuarios();
        },
        read(value){
            this.cambiar();
            this.$refs.componenteForm.read(value);
        },
        update(value){
            this.cambiar();
            this.$refs.componenteForm.update(value);
        },
        inData(){
            this.cambiar();
            this.limpiarRetorno2();
            this.$refs.componenteForm.variar();
        },
        limpiarDatos(){
            this.limpiarTipoDocumento();
            this.limpiarPersona();
            this.limpiarCargo();
            this.limpiarPersonal();
            this.limpiarUsuario();
            this.limpiarDatoact2();
        },
        verModal(value){
            if(value == true){
                this.modal = true;
            } else{
                this.modal = false;
            }  
        },
    }
}
</script>