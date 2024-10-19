<template>
    <div class="containerT" id="form">
      <h1>Formulario nombre de ejercicio</h1>
      <form id="simple-form" @submit.prevent="comparar()" >
        <div class="form-group">
          <label for="nombre">Nombre: </label>
          <input type="text" ref="myInput" @click="call" name="nombre" id="nombre" required v-model="nombre" placeholder="ingrese el nombre del ejercicio">
        </div>
        <div id="flex">
            <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
            <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
            <font-awesome-icon icon="circle-xmark" id="cerrar" v-if="modificar" @click="cerrar"/>
        </div>
      </form>    
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return{
      pack: [],
      nombre: '',
      salvar: true,
      modificar: false,
    };
  },
  computed:{
    ...mapState(['retorno2']),
  },
//metodos CRUD
  methods:{
    ...mapActions(['actualizarDato','registrarNombre']),
    comparar() {
      if (Array.isArray(this.pack)) {
        const normalizarTexto = (texto) => texto.trim().toLowerCase().replace(/\s+/g, '');
        
        const found = this.pack.find(item =>
          normalizarTexto(item.nombre) === normalizarTexto(this.nombre));
          
        if (found) {
          alert('El nombre ya existe');
        } else {
          this.servicio();
        }
      }
    },

    servicio(){
      if(this.salvar==true){
        this.guardar();
      }
      else{
        this.actualizar();
      }
    },

    guardar(){
      axios
      .post('http://localhost:8080/api/nombreejercicio',{
        nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Nombre del ejercicio registrado con exito", response.data);
        alert("El nombe del ejercicio es registrado con exito");
        if(this.retorno2=='retorno'){
          this.actualizarDato(response.data.codigo);
          this.registrarNombre(response.data.nombre);
          this.$router.push('ejercicio');
        } else{
          this.nombre = '';
          this.$emit('escucharForm');
        }
      })
      .catch((error)=>{
        console.error("Error al registrar nombre del ejercicio:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/nombreejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre;
          this.focusInput();
        })
        .catch((error) =>{
          console.error("Error al consultar nombre del ejercicio: ", error);
        });
    },

    actualizar(){
      axios
        .put('http://localhost:8080/api/nombreejercicio/actualizar/'+this.codigo,{
          nombre: this.nombre,
      })
      .then((response)=>{
        console.log("nombre del ejercicio actualizado con exito", response.data);
        if(this.retorno2=='retorno'){
          this.actualizarDato(response.data.codigo);
          this.registrarNombre(response.data.nombre);
          this.$router.push('ejercicio');
        } else{
          this.nombre = '';
          this.$emit('escucharForm');
        }
        this.modificar= false;
        this.salvar= true;
      })
      .catch((error)=>{
        console.error("Error al actualizar el nombre del ejercicio", error);
      });   
    },
    
    read(value){
      this.consultar(value);
    },
    update(value){
      this.consultar(value);
      this.salvar=false;
      this.modificar=true;
    },
    cerrar(){
      this.modificar= false;
      this.salvar= true;
      this.nombre= "";
      this.focusInput();
      this.$emit('clearId');
    },
    focusInput(){
      this.$refs.myInput.focus();
    },
    sended(value){
      this.pack = value;
    },
    call(){
      this.$emit('calling');
    }
  },
  mounted() {
    this.focusInput();
  }
}
</script>