<template>
    <div class="container2" id="form">
        <h1>Datos personales</h1>
        <form @submit.prevent="actualizarDatos()" id="scroll4">
        
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
    }
  },
    computed:{
      ...mapState('usuario',['usuario','usuarios']),
      ...mapState('personal',['personal']),
      ...mapState('persona',['persona']),
        
    },
    methods:{
      ...mapActions('persona',['actualizarPersona','consultarPersona']),
      ...mapActions('personal',['actualizarPersonal','consultarPersonal']),
      ...mapActions('usuario',['actualizarUsuario','consultarAllUsuarios','consultarUsuario']),

      async datosPerfil(){
        try{
          const username = localStorage.getItem('username').trim();
          const password = localStorage.getItem('password').trim();
          console.log('1-username: ', username);
          console.log('2-password: ', password);
          await this.consultarAllUsuarios();
          await this.$nextTick();

          if(Array.isArray(this.usuarios)){
            const foundUser = this.usuarios.find(user =>
            user.username.trim() === username &&
            user.password.trim() === password);
            console.log('3-foundUser: ', foundUser);
            const idUsuario = foundUser.codigo;
            console.log('idUsuario: ', idUsuario);

            if(idUsuario != null){
              await this.consultarUsuario(idUsuario);
              await this.$nextTick();
              console.log('USUARIO: ',this.usuario);
              const idPersonal = this.usuario?.personal?.codigo;
              console.log('idPersonal: ', idPersonal);

              if(idPersonal != null){
                await this.consultarPersonal(idPersonal);
                await this.$nextTick();
                console.log('PERSONAL: ', this.personal);
                this.nombreCargo = this.personal.cargo.nombre;
                const idPersona = this.personal?.persona?.codigo;
                console.log('idPersona: ', idPersona);

                if(idPersona != null){
                await this.consultarPersona(idPersona);
                await this.$nextTick();
                console.log('PERSONA: ',this.persona);
                this.nombreTD = this.persona?.tipoDocumento?.nombre;
                }
              }
            }
          }
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
        };
        const personaId = this.usuario.personal.persona.codigo;
        await this.actualizarPersona({codigo:personaId, data:data});
        await this.$nextTick();

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
        localStorage.setItem('username',this.usuario.username);
        localStorage.setItem('password', this.usuario.password);
        const usuarioId = this.usuario.codigo
        console.log('usuarioId: ',usuarioId);
        await this.actualizarUsuario({codigo:usuarioId, data:dataUsuario});
        await this.consultarUsuario(usuarioId);
        await this.$nextTick();
        console.log('usuario new,',this.usuario);
        this.$router.push('/');
        console.log('resultado final: ', this.usuario);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        throw error;
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
  mounted(){
    this.consultarAllUsuarios();
    this.datosPerfil();
    console.log('usuario: ', this.usuario);
  }
}
</script>