<template>
    <div class="inicio">
        <div class="login">
        <h1>¡Solicitud enviada!</h1>
        <div id="parrafo"></div>
        <br>
        <div class="contenedor">     
            <div class="form-group">
                <p id="text">Se ha enviado un mensaje a {{ result }} con instrucciones para restaurar
                    tu contraseña y acceder a tu cuenta.</p></div>
        </div>
        <br>
        <button id="login" type="button" name="resetPass" @click="resetPass">Aceptar</button>
    </div>
</div>
    
</template>

<script>
import { mapActions, mapState } from 'vuex';

    export default{
        data(){
            return{
                result:''
            }
        },
        computed:{
            ...mapState(['email']),
        },
        methods:{
            ...mapActions(['limpiarEmail']),

        emailPacial(){
            console.log('email: ', this.email);
            const correo = this.email;
            const [usuario, dominio] = correo.split('@');
            const oculto = usuario.slice(0, 3) + '*******';
            this.result = oculto + '@' + dominio;
        },
        resetPass(){
            this.$router.push({name:'login'});
        }
    },
    mounted(){
        this.emailPacial();
    }
}
</script>