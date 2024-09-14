<template>
    <div class="view">
        <div class="components">
            <FormMusculo @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaMusculo ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>
</template>

<script>
import FormMusculo from '@/components/formularios/FormMusculo.vue';
import TablaMusculo from '@/components/tablas/TablaMusculo.vue';

export default{
    name:'MusculoView',
    components:{
        FormMusculo,
        TablaMusculo
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerMusculos();
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