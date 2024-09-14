<template>
    <div class="view">
        <div class="components">
            <FormTipoEjercicio @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaTipoEjercicio ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>
</template>

<script>
import FormTipoEjercicio from '@/components/formularios/FormTipoEjercicio.vue'
import TablaTipoEjercicio from '@/components/tablas/TablaTipoEjercicio.vue'

export default{
    name:'TipoEjercicioView',
    components:{
        FormTipoEjercicio,
        TablaTipoEjercicio
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoEjercicios();
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