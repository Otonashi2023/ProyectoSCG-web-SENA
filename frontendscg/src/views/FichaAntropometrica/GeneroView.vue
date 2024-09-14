<template>
    <div class="view">
        <div class="components">
            <FormGenero @escucharForm="puente" ref="componenteForm" @clearId="jumper"/>
            <TablaGenero ref="componente" @ById="read" @change="update" @escuchartable="tabla"/>
        </div>
    </div>
</template>

<script>
import FormGenero from '@/components/formularios/FormGenero.vue'
import TablaGenero from '@/components/tablas/TablaGenero.vue'

export default{
    name:'GeneroView',
    components:{
        FormGenero,
        TablaGenero
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerGeneros();
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
        }
    }
}
</script>