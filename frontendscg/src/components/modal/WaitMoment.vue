<template>
<div class="modal-overlay">
<div v-if="cargando" class="loader">
<img src="@/assets/loading.gif" alt="Cargando..." />
</div>     
</div>
</template>

<script>
//contructor de las variables 
export default {
    data(){
        return{
            cargando: true,
        }
    },
}
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loader img {
        width: 50px;
    }
</style>