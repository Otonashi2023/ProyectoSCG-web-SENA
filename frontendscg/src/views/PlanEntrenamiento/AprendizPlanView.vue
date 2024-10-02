<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Aprendiz</h1>
                <div id="alibutton">
                    <router-link to="aprendiz" style="color:green;margin-right: 10px; font-weight: 700;">Ir a aprendiz</router-link> |
                    <router-link to="fichaAntropometrica" style="color:orangered;margin-right: 10px; font-weight: 700;">Ir a ficha antropo</router-link>
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormAprendizPlan @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaAprendizPlan ref="componente" @ById="read" @change="update" @goForm="inData" @verModal="verModal"/></div>
            <div v-if="modal"><ModalAprendizPlan @verModal="verModal"/></div>
        </div>
    </div>
</template>

<script>
import FormAprendizPlan from '@/components/formularios/FormAprendizPlan.vue';
import TablaAprendizPlan from '@/components/tablas/TablaAprendizPlan.vue';
import ModalAprendizPlan from '@/components/modal/ModalAprendizPlan.vue';
import { mapActions, mapState } from 'vuex';

export default{
    name:'AprendizPlanView',
    components:{
        FormAprendizPlan,
        TablaAprendizPlan,
        ModalAprendizPlan,
    },
    data(){
        return{
            listar:true,
            formulario:false,
            modal: false,
        }
    },
    computed:{
        ...mapState('aprendizPlan',['aprendizPlan']),
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        ...mapActions('aprendizPlan',['limpiarAprendizPlan']),
        ...mapActions(['limpiarRetorno4','limpiarDatoact4']),

        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
        async irAformulario(){
            this.limpiarDatos();
            await this.$nextTick();
            this.cambiar();
            this.$refs.componenteForm.cerrar();
        },
        async salir(){
            this.limpiarDatos();
            await this.$nextTick();
            this.formulario=false;
            this.listar=true;
            this.$refs.componente.aprendizPlanFiltrado();
            this.$refs.componenteForm.cerrar();
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
            this.limpiarRetorno4();
            this.$refs.componenteForm.loadDatos3();
            this.$refs.componenteForm.variar();
        },
        limpiarDatos(){
            this.limpiarAprendizPlan();
        },
        verModal(value){
            console.log(value);
            if(value == true){
                this.modal = true;
                console.log('open: ',this.modal);
            } else{
                this.modal = false;
                console.log('close: ',this.modal);
            }  
        },
    },
}
</script>