<template>
    <div class="view">
        <div class="components">
            <FormFormacion @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaFormacion ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>
</template>

<script>
import FormFormacion from '@/components/formularios/FormFormacion.vue'
import TablaFormacion from '@/components/tablas/TablaFormacion.vue'

export default{
    name:'NombreEjercicioView',
    components:{
        FormFormacion,
        TablaFormacion
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerFormaciones();
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