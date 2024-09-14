<template>
    <div class="container" id="form">
      <h1>Formulario tipo de rutina</h1>
      <form id="simple-form" @submit.prevent="comparar()" >
        <div class="form-group">
          <label for="nombre">Nombre: </label>
          <input type="text" ref="myInput" @click="call" name="nombre" id="nombre" required v-model="nombre" placeholder="ingrese el tipo de rutina">
        </div>
        <div id="flex">
            <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
            <button id="guardar" type="button" name="actulizar" v-if="modificar" @click="actualizar">Actualizar</button>
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
      nombre: "",
      salvar: true,
      modificar: false,
    };
  },
  computed:{...mapState(['dato4','retorno','nombre'])},
//metodos CRUD
  methods:{
    ...mapActions(['registrarNombre','actualizarDato4','limpiarNombre','limpiarDato4']),

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
      this.limpiarDato4();
      axios
      .post('http://localhost:8080/api/tiporutina',{
        nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Tipo rutina registrado con exito", response.data);
        alert("El Tipo rutina es registrado con exito");
        if(this.retorno=='retorno'){
          this.actualizarDato4(response.data.codigo);
          this.registrarNombre(response.data.nombre);
          this.$router.push('rutina');
        } else{
          this.nombre = '';
        this.$emit('escucharForm');
        }    
      })
      .catch((error)=>{
        console.error("Error al registrar tipo de rutina:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/tiporutina/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre;
          this.focusInput();
        })
        .catch((error) =>{
          console.error("Error al consultar tipo de rutina: ", error);
        });
    },

    actualizar(){
      axios
        .put('http://localhost:8080/api/tiporutina/actualizar/'+this.codigo,{
          nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Tipo de rutina actualizado con exito", response.data);
        if(this.retorno=='retorno'){
          this.actualizarDato4(response.data.codigo);
          this.registrarNombre(response.data.nombre);
          this.$router.push('rutina');
        } else{
          this.nombre = '';
          this.$emit('escucharForm');
        }
        this.modificar= false;
        this.salvar= true;
      })
      .catch((error)=>{
        console.error("Error al actualizar el tipo de rutina", error);
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
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.dato4);
    },
    sended(value){
      this.pack = value;
    },
    async call(){
      this.$emit('calling');
      await this.$nextTick();
    }
  },
  mounted() {
    this.focusInput();
  }
}
</script>