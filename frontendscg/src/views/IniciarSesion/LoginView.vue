<template>
  <div id="miAlerta">{{ mensaje }}</div>
  <div class="inicio">
  <!--ventana para iniciar sesion-->
  <div class="login">
      <h1>Inicio de sesión</h1>
      <div id="parrafo">
        <p>Por favor ingrese tu usuario y contraseña para continuar.</p>
    </div>
    <br>
    <form v-on:submit.prevent="handleLogin">
      <div class="contenedor">
        <div class="form-group">
          <label for="username">Usuario</label><br>
          <input type="text" ref="myInput" name="username" id="username" required v-model="username" placeholder="Ingrese el nombre de usuario" >
        </div>
        <br>
        <div class="form-group">
          <div id="fila"><label for="password">Contraseña</label>
          <router-link to="/recuperarPass" style="color:black">¿Olvidaste tu contraseña?</router-link></div>
          <input type="password" id="password" required v-model="password" placeholder="Ingrese la contraseña">
        </div>
        <div class="form-group">
          <input type="checkbox" id="remember" v-model="remember" >
          <label for="remember">Recordar contraseña</label>
        </div>
      </div>
      <br>
      <button id="login" type="submit" name="login">Ingresar</button>
    </form>
    <br>
    <div class="alert-danger" role="alert" v-if="error">
        {{ error_msg }}
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
import { mapActions } from 'vuex';

  export default {
    data(){
    return{
      username: "",
      password: "",
      remember: false,
      error: false,
      error_msg: "",
      mensaje:""
    }
  },
  created() {
    this.loadCredentials();
  },
  // metodo para el servicio (logear)
  methods: {
    ...mapActions(['updateVisibleIn','updateVisibleOut']),
    handleLogin() {
      if (this.remember) {
        this.saveCredentials();
      } else {
        this.clearCredentials();
      }
      {
      axios
      .post('http://localhost:8080/api/usuario/login',{
        username: this.username,
        password: this.password,
      })
      .then((response)=>{
        if(response.data =="inicio de sesion exitoso"){
          this.$store.dispatch('login', { username: this.username });

          this.mensaje="¡Bienvenido! '"+ this.username +"'";
          var alerta = document.getElementById('miAlerta');
          alerta.style.display = 'block';
          setTimeout(function() {
          alerta.style.display = 'none';
          }, 1500); // La alerta se cierra automáticamente después de 1.5 segundos

          setTimeout(() => {
            this.$router.push(this.$route.query.redirect || '/');
            this.updateVisibleIn(true);
            this.updateVisibleOut(false);
          }, 1500); // 1500 milisegundos = 1.5 segundos
          console.log("Bienvenido");       
        }
        else{
          this.error = true;
          this.error_msg=response.data;
          console.log(this.error_msg);
        }

        this.username = '';
        this.password = '';

      })
      .catch((error)=>{
        console.error("Error al iniciar sesion:", error);
      });
    }
    },
    saveCredentials() {
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      localStorage.setItem('remember', this.remember);
    },
    loadCredentials() {
      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');
      const savedRemember = localStorage.getItem('remember');

      if (savedRemember) {
        this.username = savedUsername ? savedUsername : '';
        this.password = savedPassword ? savedPassword : '';
        this.remember = savedRemember === 'true';
      }
    },
    clearCredentials() {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('remember');
    },
    redireccionar(){
      this.$router.push(this.$route.query.redirect || '/');
    },
  },
  mounted() {
    this.$refs.myInput.focus();
    this.redireccionar();
  }
}
</script>