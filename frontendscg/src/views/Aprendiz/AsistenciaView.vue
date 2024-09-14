<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Reporte</h1>
                <div id="alibutton">
                </div>
            </div>
            <div><TablaAsistencia/></div>
        </div>
    </div>
</template>

<script>
import TablaAsistencia from '@/components/tablas/TablaAsistencia.vue';

export default{
    name:'AsistenciaView',
    components:{
        TablaAsistencia
    },

    computed:{
        user() {
                return this.$store.state.user;
            },
    },
}
</script>