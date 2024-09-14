<template>
    <div class="view1">
        <div class="components">
            <FormNombreEjercicio @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaNombreEjercicio ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>
</template>

<script>
import FormNombreEjercicio from '@/components/formularios/FormNombreEjercicio.vue'
import TablaNombreEjercicio from '@/components/tablas/TablaNombreEjercicio.vue'

export default{
    name:'NombreEjercicioView',
    components:{
        FormNombreEjercicio,
        TablaNombreEjercicio
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerNombreEjercicios();
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