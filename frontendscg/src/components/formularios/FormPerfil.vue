<template>
    <div class="container2" id="form">
        <h1>Datos personales</h1>
        <form @submit.prevent="actualizarDatos()" id="scroll">
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
            <input type="text" name="nombres" id="input2" v-model="persona.nombres" placeholder="haz click para ingresar los nombres" readonly disabled>
            </div>
            <div class="form-group">
            <label for="apellidos">Apellidos: </label>
            <input type="text" name="apellidos" id="input2" v-model="persona.apellidos" placeholder="haz click para ingresar los apellidos" readonly disabled>
            </div>
            <div class="form-group">
            <label for="">Tipo de documento: </label>
            <input type="text" name="documento" id="input2" v-model="nombreTD" placeholder="haz click para ingresar el tipo de documento" readonly disabled>
            </div>
            <div class="form-group">
            <label for="cedula">Número de identificación: </label>
            <input type="number" name="cedula" id="input2"  v-model="persona.cedula" placeholder="ingrese el numero de cedula" readonly disabled>
            </div>
            <div class="form-group">
            <label for="celular">Celular:</label>
            <input type="number" name="celular" id="input2" style="background-color: #CCF0EB"  v-model="persona.celular" placeholder="ingrese el numero de celular ">
            </div>
            <div class="form-group">
            <label for="contacto">Contacto:</label>
            <input type="text" name="contacto" id="input2" style="background-color: #CCF0EB"  v-model="persona.contacto" placeholder="ingrese el nombre de contacto ">
            </div>
            <div class="form-group">
            <label for="celularAlt">Celular de contacto:</label>
            <input type="number" name="repeticiones" id="input2" style="background-color: #CCF0EB" v-model="persona.celularAlt" placeholder="ingrese el numero de celular alterno">
            </div>
            <div class="form-group">
            <label for="correo">Email:</label>
            <input type="email" name="descanso" id="input2" style="background-color: #CCF0EB" v-model="persona.correo" placeholder="ingrese el correo electrónico">
            </div>
            <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" name="username" id="input2" style="background-color: #CCF0EB"  v-model="usuario.username" placeholder="ingrese nombre de usuario" autocomplete="off" required>
            </div>
            <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" name="password" id="input2" style="background-color: #CCF0EB" v-model="usuario.password" placeholder="ingrese la contraseña" autocomplete="new-password" required>
            </div>
            <div class="form-group">
            <label for="cargo">Cargo:</label>
            <input type="text" name="cargo" id="input2"  v-model="nombreCargo" placeholder="ingrese el cargo" readonly disabled>
            </div>
            <div class="form-group"><div></div><div>
              <font-awesome-icon icon="file" id="editar" style="width: 50px; height:  45px;" @click.stop="abrirModal"/><span> ver detalle</span>
            </div>
            </div>
        </div>

        <div class="comp-form-group">
            
        </div>
        <div id="dist">
            <div></div>
            <div id="formbutton">
            <button type="submit">Guardar cambios</button>
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
      nombreTD:"",
      nombreCargo:"",

      logear: [],

      foto: null,
      imagePreview: require('@/assets/foto150.png'),
    }
  },
    computed:{
      ...mapState('usuario',['usuario','usuarios']),
      ...mapState('personal',['personal']),
      ...mapState('persona',['persona']),

    },
    methods:{
      ...mapActions('persona',['actualizarPersona','consultarPersona','subirFotoPersona']),
      ...mapActions('personal',['actualizarPersonal','consultarPersonal']),
      ...mapActions('usuario',['actualizarUsuario','consultarAllUsuarios','consultarUsuario']),
      ...mapActions(['resetVisibleIn','resetVisibleOut']),

      async datosPerfil(){
        try{
          this.logear = [this.usuario.username, this.usuario.password];
          console.log('LOGEAR: ', this.logear);
          const idPersonal = this.usuario.personal.codigo;
          await this.consultarPersonal(idPersonal);
          const idPersona = this.personal.persona.codigo;
          await this.consultarPersona(idPersona);
          await this.$nextTick();
          this.nombreTD = this.persona.tipoDocumento.nombre;
          this.nombreCargo = this.personal?.cargo?.nombre;
          this.urlImagen();
        }
        catch(error){
          console.log('error al cargar los datos del perfil', error);
        }
    },

    async actualizarDatos(){
      try {
        const data = {
          nombres: this.persona.nombres,
          apellidos: this.persona.apellidos,
          cedula: this.persona.cedula,
          celular: this.persona.celular,
          contacto: this.persona.contacto,
          celularAlt: this.persona.celularAlt,
          correo: this.persona.correo,
          tipoDocumento: this.persona.tipoDocumento.codigo,
          foto: this.persona.foto,
        };
        const personaId = this.usuario.personal.persona.codigo;
        await this.actualizarPersona({codigo:personaId, data:data});
        await this.$nextTick();

        const formData = new FormData();
        formData.append('file', this.foto);
        await this.subirFotoPersona({codigo: personaId, formData});

        const dataPersonal = {
          cargo: this.personal.cargo.codigo,
          persona: personaId,
        };
        const personalId = this.personal.codigo;
        console.log('ID personal  XD: ', personalId);
        console.log('dataPersonal:',dataPersonal);
        await this.actualizarPersonal({codigo:personalId, data:dataPersonal});
        await this.$nextTick();
        console.log('Personal: ', this.personal);
        
        const dataUsuario = {
          username: this.usuario.username,
          password: this.usuario.password,
          personal: personalId,
        };
        console.log('DataUsuario: ',dataUsuario);

        if (localStorage.getItem('username') && localStorage.getItem('password')) {
          localStorage.setItem('username',this.usuario.username);
          localStorage.setItem('password', this.usuario.password);
        }

        const usuarioId = this.usuario.codigo;
        console.log('usuarioId: ',usuarioId);
        await this.actualizarUsuario({codigo:usuarioId, data:dataUsuario});
        await this.consultarUsuario(usuarioId);
        await this.$nextTick();
        console.log('usuario new,',this.usuario);
        
        if(this.logear[0] !== dataUsuario.username || this.logear[1] !== dataUsuario.password){
          this.$store.dispatch('logout');
          this.$router.push('/login');
          this.resetVisibleIn();
          this.resetVisibleOut();
        } else{
          this.$router.push('/');
        }
        console.log('resultado final: ', this.usuario);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        throw error;
      }
    },

    urlImagen(){
      const baseUrl = 'http://localhost:8080';
      this.imagePreview = this.persona.foto
        ? `${baseUrl}${this.persona.foto}`
        : require('@/assets/foto150.png');
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

    async abrirModal(){
      const codigo = this.usuario.personal.codigo;
      await this.consultarPersonal(codigo);
      await this.$nextTick();
      const modal = true;
      this.$emit('verModal', modal);
    }, 
  },
  created(){
    this.datosPerfil();
  },
  mounted(){
    console.log('usuario perfil: ', this.usuario);
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