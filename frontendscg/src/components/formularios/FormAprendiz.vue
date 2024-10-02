<template>
  <div class="container2" id="form">
    <div style="display:grid;grid-template-columns: 1fr 1fr 1fr; height: 60px; padding:0; margin:0px;">
    <div></div>
    <div style="padding: 0px; margin: 0px;"><h1>Datos personales</h1></div>
    
  </div>
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
          <input type="text" name="nombres" id="input2" v-model="nombres" placeholder="haz click para ingresar los nombres" required>
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos: </label>
          <input type="text" name="apellidos" id="input2" v-model="apellidos" placeholder="haz click para ingresar los apellidos" required>
        </div>
        <div class="form-group">
          <label for="">Tipo de documento: </label>
          <input type="text" name="documento" id="input2" @click="callMetodoN"  v-model="nombreTipoDocumento" placeholder="haz click para ingresar el tipo de documento" readonly>
        </div>
        <div class="form-group">
          <label for="cedula">Número de identificación: </label>
          <input type="number" name="cedula" id="input2"  v-model="cedula" placeholder="ingrese el numero de cedula" required>
        </div>
        <div class="form-group">
          <label for="celular">Celular:</label>
          <input type="number" name="celular" id="input2"  v-model="celular" placeholder="ingrese el numero de celular " required>
        </div>
        <div class="form-group">
          <label for="contacto">Contacto:</label>
          <input type="text" name="contacto" id="input2"  v-model="contacto" placeholder="ingrese el nombre de contacto " required>
        </div>
        <div class="form-group">
          <label for="celularAlt">Celular de contacto:</label>
          <input type="number" name="repeticiones" id="input2" v-model="celularAlt" placeholder="ingrese el numero de celular alterno" required>
        </div>
        <div class="form-group">
          <label for="correo">Email:</label>
          <input type="email" name="descanso" id="input2" v-model="correo" placeholder="ingrese el correo electrónico" required>
        </div>
        <div class="form-group">
          <label for="ficha">Ficha:</label>
          <input type="number" name="repeticiones" id="input2" @click="callMetodoF"  v-model="vficha" placeholder="ingrese el número de ficha" readonly>
        </div>
        <div class="form-group">
          <label for="formacion">Formacion:</label>
          <input type="text" name="descanso" id="input2" v-model="nombreFormacion" placeholder="ingrese la formacion" readonly>
        </div>
        <div class="form-group">
          <label for="restricMedicas">Restricciones Medicas:</label>
          <input type="text" name="restricMedicas" id="input2"  v-model="restricMedicas" placeholder="ingrese las restricciones médicas" required>
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
      nombres: '',
      apellidos: '',
      nombreTipoDocumento: '',
      cedula: null,
      celular: null,
      contacto: '',
      celularAlt: null,
      correo: '',
      vficha: null,
      nombreFormacion: '',

      salvar: true,
      modificar: false,

      foto: null,
      imagePreview: require('@/assets/foto150.png'),
    }
  },
  computed:{
    ...mapState('tipoDocumento',['tipoDocumento']),
    ...mapState('persona',['persona','personas']),
    ...mapState('formacion',['formacion']),
    ...mapState('ficha',['ficha']),
    ...mapState('aprendiz',['aprendiz']),
    ...mapState(['datoact1']),

  },
  methods:{
    ...mapActions('tipoDocumento',['consultarTipoDocumento']),
    ...mapActions('persona',['guardarPersona','addPersona','consultarPersona','limpiarCodigoPersona','actualizarPersona',
      'consultarAllPersonas','subirFotoPersona']),
    ...mapActions('formacion',['consultarFormacion']),
    ...mapActions('ficha',['guardarFicha','consultarFicha']),
    ...mapActions('aprendiz',['guardarAprendiz','addAprendiz','consultarAprendiz','limpiarCodigoAprendiz','actualizarAprendiz']),
    ...mapActions(['actualizarRetorno','actualizarDatoact1','limpiarDatoact1']),
    
  cargarDatos(){
    this.urlImagen();
    this.nombres = this.persona.nombres;
    this.apellidos = this.persona.apellidos;
    this.nombreTipoDocumento = this.tipoDocumento.nombre;
    this.cedula = this.persona.cedula;
    this.celular = this.persona.celular;
    this.contacto = this.persona.contacto;
    this.celularAlt = this.persona.celularAlt;
    this.correo = this.persona.correo;
    this.vficha = this.ficha?.numero;
    this.nombreFormacion = this.formacion?.nombre;
    this.restricMedicas = this.aprendiz.restricMedicas;
  },

  datosPersona(){
      this.data = {
        codigo: this.persona.codigo,
        nombres: this.nombres,
        apellidos: this.apellidos,
        tipoDocumento: this.tipoDocumento.codigo,
        cedula: this.cedula,
        celular: this.celular,
        contacto: this.contacto,
        celularAlt: this.celularAlt,
        correo: this.correo,
        foto: this.persona.foto,
      };
      console.log('data: ',this.data);
    },
    datosAprendiz(personaId){
      console.log('aqui dentro del data: ', personaId);
      this.dataAprendiz = {
        codigo: this.aprendiz.codigo,
        restricMedicas: this.restricMedicas,
        persona: personaId,
        ficha: this.ficha.codigo,
      };

      console.log('este es el data: ', this.dataAprendiz);
    },

    servicio(){
      if(this.salvar==true){
        if(this.tipoDocumento.codigo != null && this.ficha.codigo != null){
          this.registrarAprendiz();
        }
        else{
          alert("hay campos vacios");
        }  
      }
      else{
        this.modificarAprendiz();
      }
    },
    async registrarAprendiz(){
      await this.limpiarCodigoPersona();
      await this.limpiarCodigoAprendiz();
      await this.$nextTick();
      try {
        this.datosPersona();
        await this.guardarPersona(this.data);
        await this.$nextTick();
        const personaId = this.persona.codigo;
        console.log('persona: ',this.persona);

        const formData = new FormData();
        formData.append('file', this.foto);
        await this.subirFotoPersona({codigo: personaId, formData});

        this.datosAprendiz(personaId)
        await this.guardarAprendiz(this.dataAprendiz);
        await this.$nextTick();
        
        await this.consultarAprendiz(this.aprendiz.codigo);
        this.$router.push('fichaAntropometrica');
      } catch (error) {
        console.error("Error al guardar aprendiz:", error);
      }
    },

    async modificarAprendiz(){
      try {
        this.datosPersona();
        const idPersona = this.persona.codigo;
        await this.actualizarPersona({codigo: idPersona, data: this.data});
        await this.$nextTick();
        const personaId = this.persona.codigo;
        console.log('persona: ',this.persona);
        console.log('personaId: ', personaId);

        const formData = new FormData();
        formData.append('file', this.foto);
        await this.subirFotoPersona({codigo: personaId, formData});

        this.datosAprendiz(personaId);
        const idAprendiz = this.aprendiz?.codigo;
        await this.actualizarAprendiz({codigo: idAprendiz, data: this.dataAprendiz});
        await this.$nextTick();
        console.log('aprendiz: ',this.aprendiz)
        await this.limpiarDatoact1();
        await this.$nextTick();
        this.$emit('leave');
      } catch (error) {
        console.error("Error al guardar aprendiz:", error);
      }
    },

    async read(value){
      this.imagePreview = require('@/assets/foto150.png');
      await this.$nextTick();
      await this.consultarAprendiz(value);
      await this.consultarPersona(this.aprendiz?.persona?.codigo);
      await this.consultarTipoDocumento(this.persona?.tipoDocumento?.codigo); 
      await this.consultarFicha(this.aprendiz?.ficha?.codigo);
      await this.consultarFormacion(this.ficha?.formacion?.codigo);
      await this.$nextTick();
      this.cargarDatos();
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
      await this.consultarAllPersonas();
      await this.$nextTick();
      console.log('LISTA DE PERSONAS: ',this.personas);
      if (Array.isArray(this.personas)) {
        this.found = this.personas.find(item =>
          item.cedula === this.cedula || 
          item.correo === this.correo);
        console.log('FOUND: ', this.found);

        if (this.found) {
          if(this.datoact1 == null){
            if(this.found.cedula === this.cedula){
              alert('la cedula ya existe');
            }
            else if(this.found.correo === this.correo){
              alert('el correo ya existe');
            }
          } else{
            this.modificarAprendiz();
          }
        } else {
          this.servicio();
        }
      }
    },

    update(value){
      this.actualizarDatoact1(value);
      this.variar();
      this.read(value);
    },
    cerrar(){
      this.salvar = true;
      this.modificar = false;
      this.limpiarDatoact1();
    },
    variar(){
      if(this.datoact1 != null){
        this.modificar = true;
        this.salvar = false;
      }
    },

    storageTemporal(){
      this.datosPersona(); 
      this.addPersona(this.data);
      console.log('el data es: ',this.data);
      this.datosAprendiz()
      this.addAprendiz(this.dataAprendiz);
    },

    callMetodoN(){    
      this.storageTemporal();
      this.actualizarRetorno('retorno');
      this.$router.push('tipoDocumento');
    },
    callMetodoF(){
        this.storageTemporal();
        this.actualizarRetorno('retorno');
        this.$router.push('ficha');
      },
  },
  mounted(){
    this.cargarDatos();
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