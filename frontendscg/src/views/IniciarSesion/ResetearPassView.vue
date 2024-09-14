<template>
  <div class="inicio">
    <div class="login">
        <h1>Inicio de sesión</h1>
        <div id="parrafo">
          <p>Por favor ingrese tus nuevas credenciales para continuar.</p>
      </div>
      <br>
        <form v-on:submit.prevent="login">
          <div class="contenedor">
            <div class="form-group">
              <label for="password">Nueva contraseña</label><br>
              <input type="password" ref="myInput" name="password" id="password" required v-model="password" placeholder="Ingrese la nueva contraseña" >
            </div>
            <br>
            <div class="form-group">
              <div><label id="izquierda" for="password">Repetir Contraseña</label></div>
              <input type="password" id="password" required v-model="repetpassword" placeholder="Ingrese nuevamente la contraseña">
            </div>
          </div>
          <br>
          <button id="login" type="submit" name="login">Guardar</button>
        </form>
      </div>
    </div>
</template>

<script>
export default{
  data(){
    return{
      password:"",
      repetpassword:"",
    }
  },
  methods:{
    login(){
      this.$router.push({name:'login'});
    }
  },
  mounted() {
    this.$refs.myInput.focus();
  }
}
</script>