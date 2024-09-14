<template>
    <div class="view">
        <div class="components">
            <FormTipoDocumento @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaTipoDocumento ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>
</template>

<script>
import FormTipoDocumento from '@/components/formularios/FormTipoDocumento.vue'
import TablaTipoDocumento from '@/components/tablas/TablaTipoDocumento.vue'

export default{
    name:'TipoDocumentoView',
    components:{
        FormTipoDocumento,
        TablaTipoDocumento
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoDocumentos();
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