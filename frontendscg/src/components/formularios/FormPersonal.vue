<template>
  <div class="container2" id="form">
    <h1>Datos Personales</h1>
    <form @submit.prevent="compararDatos()" id="scroll">
      <div style="display: grid; grid-template-columns: auto; justify-content: center;">
        <input style="display: none;" type="file" accept="image/*" @change="onFileChange" ref="fileInput"/>
      </div>
      <div v-if="imagePreview" style="margin-bottom: 8px;">
        <h3>Previsualización de la Imagen:</h3>
        <img :src="imagePreview" alt="Imagen seleccionada" style="max-width: 150px; max-height: 150px;" @click="triggerFileInput"/>
      </div>
      <div class="comp-form-group2">
        <div class="form-group">
          <label for="nombres">Nombres: </label>
          <input type="text" name="nombres" id="input2" v-model="persona.nombres" placeholder="haz click para ingresar los nombres" required>
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos: </label>
          <input type="text" name="apellidos" id="input2" v-model="persona.apellidos" placeholder="haz click para ingresar los apellidos" required>
        </div>
        <div class="form-group">
          <label for="">Tipo de documento: </label>
          <input type="text" name="documento" id="input2" @click="callMetodoN" v-model="tipoDocumento.nombre" placeholder="haz click para ingresar el tipo de documento" readonly>
        </div>
        <div class="form-group">
          <label for="cedula">Número de identificación: </label>
          <input type="number" name="cedula" id="input2"  v-model="persona.cedula" placeholder="ingrese el numero de cedula" required>
        </div>
        <div class="form-group">
          <label for="celular">Celular:</label>
          <input type="number" name="celular" id="input2"  v-model="persona.celular" placeholder="ingrese el numero de celular " required>
        </div>
        <div class="form-group">
          <label for="contacto">Contacto:</label>
          <input type="text" name="contacto" id="input2"  v-model="persona.contacto" placeholder="ingrese el nombre de contacto " required>
        </div>
        <div class="form-group">
          <label for="celularAlt">Celular de contacto:</label>
          <input type="number" name="repeticiones" id="input2" v-model="persona.celularAlt" placeholder="ingrese el numero de celular alterno" required>
        </div>
        <div class="form-group">
          <label for="correo">Email:</label>
          <input type="email" name="descanso" id="input2" v-model="persona.correo" placeholder="ingrese el correo electrónico" required>
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" name="username" id="input2"  v-model="usuario.username" placeholder="ingrese nombre de usuario" autocomplete="off" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" name="password" id="input2" v-model="usuario.password" placeholder="ingrese la contraseña" autocomplete="new-password" required>
        </div>
        <div class="form-group">
          <label for="cargo">Cargo:</label>
          <input type="text" name="cargo" id="input2" @click="callMetodoC" v-model="cargo.nombre" placeholder="ingrese el cargo" readonly>
        </div>
      </div>

      <div class="comp-form-group">
        
      </div>
      <div id="dist">
        <div></div>
        <div id="formbutton">
            <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
            <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
            <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
        </div>
        <div></div>
      </div> 
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
  
  export default {
    data(){
      return{
        salvar: true,
        modificar: false,

        foto: null,
        imagePreview: require('@/assets/foto150.png'),
      }
    },
    computed:{
      ...mapState('tipoDocumento',['tipoDocumento']),
      ...mapState('persona',['persona']),
      ...mapState('cargo',['cargo']),
      ...mapState('personal',['personal','idPersonal']),
      ...mapState('usuario',['usuario','usuarios']),
      ...mapState(['datoact2']),
    },
    methods:{
      ...mapActions('tipoDocumento',['consultarTipoDocumento']),
      ...mapActions('persona',['guardarPersona','consultarPersona','actualizarPersona','addPersona', 'limpiarCodigoPersona','subirFotoPersona']),
      ...mapActions('cargo',['consultarCargo']),
      ...mapActions('personal',['guardarPersonal', 'consultarPersonal','actualizarPersonal','addPersonal','saveIdPersonal','limpiarCodigoPersonal']),
      ...mapActions('usuario',['guardarUsuario','consultarUsuario', 'actualizarUsuario','consultarAllUsuarios','addUsuario','limpiarCodigoUsuario']),
      ...mapActions(['actualizarRetorno2','actualizarDatoact2','limpiarDatoact2']),

      servicio(){
      if(this.salvar==true){
        if(this.tipoDocumento.codigo != null && this.cargo.codigo){
          this.registrarPersonal();
        }
        else{
          alert("hay campos vacios");
        }  
      }
      else{
        this.verificar();
      }
    },

      datosPersona(){
        this.data = {
          nombres: this.persona.nombres,
          apellidos: this.persona.apellidos,
          cedula: this.persona.cedula,
          celular: this.persona.celular,
          contacto: this.persona.contacto,
          celularAlt: this.persona.celularAlt,
          correo: this.persona.correo,
          tipoDocumento: this.tipoDocumento.codigo,
          codigo: this.persona.codigo,
          foto: this.persona.foto,
        };
      },
      datosPersonal(personaId){
        this.dataPersonal = {
            cargo: this.cargo.codigo,
            persona: personaId,
            codigo: this.personal.codigo,
          };
      },
      datosUsuario(personalId){
        this.dataUsuario = {
            username: this.usuario.username,
            password: this.usuario.password,
            personal: personalId,
            codigo: this.usuario.codigo,
          };
      },

      async registrarPersonal(){
        await this.limpiarCodigoPersona();
        await this.limpiarCodigoPersonal();
        await this.limpiarCodigoUsuario();
        await this.$nextTick();
        try {
          this.datosPersona();
          await this.guardarPersona(this.data);
          await this.$nextTick();
          const personaId = this.persona.codigo;

          const formData = new FormData();
          formData.append('file', this.foto);
          await this.subirFotoPersona({codigo: personaId, formData});
 
          this.datosPersonal(personaId);
          await this.guardarPersonal(this.dataPersonal);
          const personalId = this.personal.codigo;
  
          this.datosUsuario(personalId);
          await this.guardarUsuario(this.dataUsuario);

          this.$emit('leave');
        } catch (error) {
          console.error("Error al guardar al personal:", error);
        }
      },

      async actualizarDatos(){
        try {
          this.datosPersona();
          const personaId = this.persona.codigo;
          await this.actualizarPersona({codigo:personaId, data:this.data});

          const formData = new FormData();
          formData.append('file', this.foto);
          await this.subirFotoPersona({codigo: personaId, formData});
 
          this.datosPersonal(personaId);
          const personalId = this.personal.codigo;
          await this.actualizarPersonal({codigo:personalId, data:this.dataPersonal});

          this.datosUsuario(personalId);
          const usuarioId =this.usuario.codigo;
         
          await this.actualizarUsuario({codigo:usuarioId, data:this.dataUsuario});
          await this.consultarUsuario(usuarioId);
          await this.$nextTick();

          this.limpiarDatoact2();
          this.$emit('leave');
        } catch (error) {
          console.error("Error al guardar al personal:", error);
        }
      },

      async verificar(){  
        if (localStorage.getItem('username') && localStorage.getItem('password')) {
        const username = localStorage.getItem('username').trim();
        const password = localStorage.getItem('password').trim();
        await this.consultarAllUsuarios();
        await this.$nextTick();

          if(Array.isArray(this.usuarios)){
            const foundUser = this.usuarios.find(user =>
            user.username.trim() === username &&
            user.password.trim() === password);
            if(this.datoact2 == foundUser.codigo){
              localStorage.setItem('username',this.usuario.username);
              localStorage.setItem('password', this.usuario.password);
              this.actualizarDatos();
            } else{
              this.actualizarDatos();
            }
          }
        } else {
          this.actualizarDatos();
        }
      },

      async consultar(value){
        this.imagePreview = require('@/assets/foto150.png');
        await this.$nextTick();
        try{
          await this.consultarUsuario(value);
          const idPersonal = this.usuario?.personal?.codigo;
          const toNumberPersonal = typeof idPersonal === 'number'
              ? idPersonal
              : '';
          await this.saveIdPersonal(toNumberPersonal);

          if(idPersonal != null){
            await this.consultarPersonal(idPersonal);
            const  idCargo = this.personal?.cargo?.codigo;
            const idPersona = this.personal?.persona?.codigo; 

            if(idCargo != null){
              await this.consultarCargo(idCargo);
            }
            if(idPersona != null){
              await this.consultarPersona(idPersona);
              const  idDocumento = this.persona?.tipoDocumento?.codigo;

              if(idDocumento != null){
                await this.consultarTipoDocumento(idDocumento)
              }
              this.urlImagen();
            }
          } 
        } catch(error){
          console.error('error al consultar personal',error);
        }
      },

      urlImagen(){
      const baseUrl = 'http://localhost:8080';
      if(this.persona.foto){
        this.imagePreview = this.persona.foto
        ? `${baseUrl}${this.persona.foto}`
        : require('@/assets/foto150.png');
      } else{
        this.imagePreview = require('@/assets/foto150.png');
      }
    },

    triggerFileInput() {
      this.$refs.fileInput.click(); // Simula un clic en el input de archivo
    },

    onFileChange(event) {
      this.imagePreview = require('@/assets/foto150.png');
      const file = event.target.files[0];
      if (file) {
        this.foto = file;
      // Crear una URL para la previsualización
      this.imagePreview = URL.createObjectURL(file);
      }
      else{
        this.urlImagen();
      }
    },
      
      async compararDatos() {
        const username = this.usuario.username.trim().toLowerCase();
        const password = this.usuario.password.trim().toLowerCase();
        const cedula = typeof this.persona.cedula === 'number'
          ? this.persona.cedula
          : '';
        const correo = typeof this.persona.correo === 'string'
          ? this.persona.correo.trim().toLowerCase()
          : '';
        await this.consultarAllUsuarios();

        if (Array.isArray(this.usuarios)) {
          const foundUser = this.usuarios.find(user => {
            const userUsername = typeof user.username === 'string'
              ? user.username.trim().toLowerCase()
              : '';
            const userPassword = typeof user.password === 'string'
              ? user.password.trim().toLowerCase()
              : '';
            const userCedula = typeof user.personal?.persona?.cedula === 'number'
              ? user.personal.persona.cedula
              : '';
            const userEmail = typeof user.personal?.persona?.correo === 'string'
              ? user.personal.persona.correo.trim().toLowerCase()
              : '';
            return userUsername === username ||
              userPassword === password ||
              userCedula === cedula ||
              userEmail === correo;
          });

          if (foundUser) {
            if(!this.datoact2){
              if (foundUser.username === username) {
                alert(`Username: "${foundUser.username}" ya existe`);
              } else if (foundUser.password === password) {
                alert(`Password: "${foundUser.password}" ya existe`);
              } else if (foundUser.personal?.persona?.cedula === cedula) {
                alert(`Cédula: "${foundUser.personal.persona.cedula}" ya existe`);
              } else if (foundUser.personal?.persona?.correo === correo) {
                alert(`Correo: "${foundUser.personal.persona.correo}" ya existe`);
              }
            } else{
              this.verificar();
            }
          } else {
            this.servicio();
          }
        }
      },

      update(value){
        this.actualizarDatoact2(value);
        this.variar();
        this.consultar(value);
      },
      read(value){
        this.limpiarDatoact2();
        this.rotar();
        this.consultar(value);
      },
      cerrar(){
        this.rotar();
        this.limpiarDatoact2();
      },
      rotar(){
        this.modificar= false;
        this.salvar= true;
      },
      variar(){
        if(this.datoact2!=null){
          this.modificar=true;
          this.salvar=false;
        }
      },
      async storageTemporal(){
        this.datosPersona();

        this.addPersona(this.data);
        this.datosPersonal();

        this.addPersonal(this.dataPersonal);
        this.datosUsuario();
        
        this.addUsuario(this.dataUsuario);
      },
      callMetodoN(){
        this.storageTemporal();        
        this.actualizarRetorno2('retorno');
        this.$router.push('tipoDocumento');
      },
      callMetodoC(){
        this.storageTemporal();
        this.actualizarRetorno2('retorno');
        this.$router.push('cargo');
      },
    },
    async mounted(){
      this.urlImagen();
      await this.$nextTick();
    }
  }
  </script>
  <style scoped>
  .container2{
    display: grid;
    justify-content: center;
  }
  .form-group{
    width: 350px;
  }
  </style>