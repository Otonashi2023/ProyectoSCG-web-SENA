<template>
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
export default{
    data(){
        return{
            correo: ""
        }
    },
    methods:{
        enviada(){
        this.$router.push({name:'solicitudEnviada'});
        }
    },
    mounted() {
        this.$refs.myInput.focus();
    }
}
</script>