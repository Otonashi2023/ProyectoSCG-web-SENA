<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Aprendiz</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormAprendiz @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaAprendiz ref="componente" @ById="read" @change="update" @goForm="inData" @verModal="verModal" @verQR="verQR"/></div>
            <div v-if="modal"><ModalAprendiz @verModal="verModal"/></div>
            <div v-if="qr"><GeneratorQR @verQR="verQR"/></div>
        </div>
    </div>
</template>

<script>
import FormAprendiz from '@/components/formularios/FormAprendiz.vue';
import ModalAprendiz from '@/components/modal/ModalAprendiz.vue';
import TablaAprendiz from '@/components/tablas/TablaAprendiz.vue';
import GeneratorQR from '@/components/utils/GeneratorQR.vue';
import { mapActions, mapState} from 'vuex';

export default{
    name:'EjercicioView',
    components:{
        FormAprendiz,
        TablaAprendiz,
        ModalAprendiz,
        GeneratorQR,
    },
    data(){
        return{
            formulario:false,
            listar:true,
            modal: false,
            qr: false
        }
    },
    computed:{...mapState(['datoact1']),
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        ...mapActions('tipoDocumento',['limpiarTipoDocumento']),
        ...mapActions('persona',['limpiarPersona']),
        ...mapActions('formacion',['limpiarFormacion']),
        ...mapActions('ficha',['limpiarFicha']),
        ...mapActions('aprendiz',['limpiarAprendiz']),
        ...mapActions(['limpiarDatoact1','limpiarRetorno']),

        irAformulario(){
            this.limpiarDatos();
            this.cambiar();
            this.$refs.componenteForm.cerrar();       
            this.$refs.componenteForm.cargarDatos();
        },
        salir(){
            this.limpiarDatos();
            this.formulario=false;
            this.listar=true;
            this.$refs.componenteForm.cerrar();
            this.$refs.componente.consultarAllAprendices();
        },
        read(value){
            this.cambiar();
            this.$refs.componenteForm.read(value);
        },
        update(value){
            this.$refs.componenteForm.update(value);
        },
        inData(){
            this.cambiar();
            this.limpiarRetorno();
            this.$refs.componenteForm.variar();
            this.$refs.componenteForm.cargarDatos();
        },
        limpiarDatos(){
            this.limpiarTipoDocumento(); 
            this.limpiarPersona();
            this.limpiarFormacion();
            this.limpiarFicha();
            this.limpiarAprendiz();
            this.limpiarDatoact1();
        },
        cambiar(){
            this.listar=false;
            this.formulario=true;
        },
        verModal(value){
            if(value == true){
                this.modal = true;
            } else{
                this.modal = false;
            }  
        },
        verQR(value){
            if(value == true){
                this.qr = true;
            } else{
                this.qr = false;
            }  
        },
    }
}
</script>