<template>
    <div v-if="modal"><WaitMoment/></div>
    <div class="inicio">
        <div class="login">
            <h1>Recuperar cuenta</h1>
            <div id="parrafo">
                <p>Por favor ingrese tu correo electrónico para continuar.</p>
            </div>
            <br>
            <form v-on:submit.prevent="handleLogin">
                <div class="contenedor">
                    <div class="form-group">
                        <label for="correo">Correo electrónico</label><br>
                        <input type="email" ref="myInput" name="correo" id="correo" required v-model="correo" placeholder="Ingrese el correo electrónico" >
                    </div>
                </div>
                <br>
                <button id="login" type="button" name="enviada" @click="enviada">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
import WaitMoment from '@/components/modal/WaitMoment.vue';
import axios from 'axios';
import { mapActions } from 'vuex';

export default{
    name:'RecuperarPassView',
    components:{
        WaitMoment,
    },
    data(){
        return{
            correo: "",
            modal: false,
        }
    },
    methods:{
        ...mapActions(['registrarEmail']),

        async enviada() {
            try {
                this.modal = true;
                // Enviar la solicitud POST a la API de Spring
                await axios.post('http://localhost:8080/api/usuario/enviarCorreo', {
                    correo: this.correo
                });
                
                this.registrarEmail(this.correo);
                // Redirigir a la página de confirmación después del éxito
                this.$router.push({ name: 'solicitudEnviada' });
                this.modal = false;
            } catch (error) {
                console.error("Error al enviar el correo", error);
                alert("Hubo un problema al enviar el correo. Inténtelo nuevamente.");
                this.modal = false;

            }
        },
    },
    mounted() {
        this.$refs.myInput.focus();
    }
}
</script>