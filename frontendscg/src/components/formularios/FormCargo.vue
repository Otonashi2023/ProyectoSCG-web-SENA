<template>
    <div class="container" id="form">
      <h1>Formulario nombre de cargo</h1>
      <form id="simple-form" @submit.prevent="comparar()" >
        <div class="form-group">
          <label for="nombre">Nombre: </label>
          <input type="text" ref="myInput" name="nombre" id="nombre" @click="call" v-model="nombre" placeholder="ingrese el nombre del cargo" required>
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
  computed:{
    ...mapState('cargo',['cargo']),
    ...mapState(['retorno2']),
  },
//metodos CRUD
  methods:{
    ...mapActions('cargo',['consultarCargo','limpiarCargo']),
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
      .post('http://localhost:8080/api/cargo',{
        nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Nombre del cargo registrado con exito", response.data);
        alert("El nombe del cargo es registrado con exito");
        if(this.retorno2 == 'retorno'){
          this.limpiarCargo();
          this.consultarTD(response.data.codigo);
          console.log(1);
        } else{
          this.nombre = '';
          this.$emit('escucharForm');
        }
      })
      .catch((error)=>{
        console.error("Error al registrar nombre del cargo:", error);
      });
    },
    async consultarTD(valor){
      await this.consultarCargo(valor);
      await this.$nextTick();
      this.$router.push('personal');
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/cargo/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre;
        })
        .catch((error) =>{
          console.error("Error al consultar nombre del cargo: ", error);
        });
    },

    actualizar(){
      axios
        .put('http://localhost:8080/api/cargo/actualizar/'+this.codigo,{
          nombre: this.nombre,
      })
      .then((response)=>{
        console.log("nombre del cargo actualizado con exito", response.data);
        if(this.retorno2 == 'retorno'){
          this.limpiarCargo();
          this.consultarTD(response.data.codigo);
          console.log(1);
        } else{
          this.nombre = '';
          this.$emit('escucharForm');
        }
        this.modificar= false;
        this.salvar= true;
      })
      .catch((error)=>{
        console.error("Error al actualizar el nombre del cargo", error);
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