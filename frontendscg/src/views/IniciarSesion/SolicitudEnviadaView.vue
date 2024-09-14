<template>
    <div class="inicio">
        <div class="login">
        <h1>¡Solicitud enviada!</h1>
        <div id="parrafo"></div>
        <br>
        <div class="contenedor">     
            <div class="form-group">
                <p id="text">Se ha enviado un mensaje a tu correo electrónico con instrucciones para restaurar
                    tu contraseña y acceder a tu cuenta.</p></div>
        </div>
        <br>
        <button id="login" type="button" name="resetPass" @click="resetPass">Aceptar</button>
    </div>
</div>
    
</template>

<script>
    export default{
        methods:{
        resetPass(){
            this.$router.push({name:'resetearPass'});
        }
    }
}
</script>