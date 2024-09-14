<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Perfil</h1>
            </div>
            <div><FormPerfil @verModal="verModal"/></div>
            <div v-if="modal"><ModalPersonal @verModal="verModal"/></div>
        </div>
    </div>
</template>

<script>
import FormPerfil from '@/components/formularios/FormPerfil.vue';
import ModalPersonal from '@/components/modal/ModalPersonal.vue';

export default{
    name:'PersonalView',
    components:{
        FormPerfil,
        ModalPersonal,
    },
    data(){
        return{
            modal: false,
        }
    },
    computed:{
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        verModal(value){
            if(value == true){
                this.modal = true;
                console.log('open: ',this.modal);
            } else{
                this.modal = false;
                console.log('close: ',this.modal);
            }  
        },
    }
}
</script>