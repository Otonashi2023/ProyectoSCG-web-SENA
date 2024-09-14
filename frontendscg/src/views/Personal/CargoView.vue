<template>
    <div class="view">
        <div class="components">
            <FormCargo @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaCargo ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>
</template>

<script>
import FormCargo from '@/components/formularios/FormCargo.vue'
import TablaCargo from '@/components/tablas/TablaCargo.vue'

export default{
    name:'CargoView',
    components:{
        FormCargo,
        TablaCargo
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerCargos();
        },
        read(value){
            this.$refs.componenteForm.read(value);
        },
        update(value){
            this.$refs.componenteForm.update(value);
        },
        tabla(){
            this.$refs.componenteForm.cerrar();
        },
        jumper(){
            this.$refs.componente.limpiarId();
        },
        sended(value){
            this.$refs.componenteForm.sended(value);
        },
        calling(){
            this.$refs.componente.sender();
        }
    }
}
</script>