<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Reporte</h1>
                <div id="alibutton">
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="tabla2" @click="salir"/>
                </div>
            </div>
            <div v-show="tabla1"><TablaAsistencia  @read="read" @showModal="showModal"/></div>
            <div v-show="tabla2"><TablaHistorial ref="componente"/></div>
            <div v-if="modal"><ModalGraficoAsistencia @showModal="showModal"/></div>
        </div>
    </div>
</template>

<script>
import ModalGraficoAsistencia from '@/components/modal/ModalGraficoAsistencia.vue';
import TablaAsistencia from '@/components/tablas/TablaAsistencia.vue';
import TablaHistorial from '@/components/tablas/TablaHistorial.vue';
import { mapActions, mapMutations } from 'vuex';

export default{
    name:'AsistenciaView',
    components:{
        TablaAsistencia,
        TablaHistorial,
        ModalGraficoAsistencia,
    },

    data(){
        return{
           tabla1: true,
           tabla2: false, 
           modal: false,
        }
    },
    computed:{
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        ...mapMutations(['clearSearchQuery']),
        ...mapActions('aprendiz',['limpiarAprendiz']),

        read(value){
            this.irATabla2();
            this.$refs.componente.read(value);
        },
        showModal(value){
            this.modal = value;
        },

        irATabla2(){
            this.tabla1 = false;
            this.tabla2 = true;
        },
        salir(){
            this.limpiarAprendiz();
            this.clearSearchQuery();
            this.tabla2 = false;
            this.tabla1 = true;
        }
    }
}
</script>