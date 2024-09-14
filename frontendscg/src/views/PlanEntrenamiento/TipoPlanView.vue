<template>
    <div class="view">
        <div class="components">
            <FormTipoPlan @escucharForm="puente" ref="componenteForm" @clearId="jumper" @calling="calling"/>
            <TablaTipoPlan ref="componente" @ById="read" @change="update" @escuchartable="tabla" @send="sended"/>
        </div>
    </div>

</template>

<script>
import FormTipoPlan from '@/components/formularios/FormTipoPlan.vue'
import TablaTipoPlan from '@/components/tablas/TablaTipoPlan.vue'

export default{
    name:'TipoPlanView',
    components:{
        FormTipoPlan,
        TablaTipoPlan
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoPlanes();
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