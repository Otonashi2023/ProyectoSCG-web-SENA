<template>
    <div class="view">
        <div class="components">
            <FormTipoRutina @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaTipoRutina ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>

</template>

<script>
import FormTipoRutina from '@/components/formularios/FormTipoRutina.vue'
import TablaTipoRutina from '@/components/tablas/TablaTipoRutina.vue'

export default{
    name:'TipoRutinaView',
    components:{
        FormTipoRutina,
        TablaTipoRutina
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoRutinas();
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