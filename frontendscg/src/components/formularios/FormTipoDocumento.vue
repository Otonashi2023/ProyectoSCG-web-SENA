<template>
    <div class="container" id="form">
      <h1>Formulario tipo de documento</h1>
      <form id="simple-form" @submit.prevent="comparar()" >
        <div class="form-group">
          <label for="nombre">Nombre: </label>
          <input type="text" ref="myInput" @click="call" name="nombre" id="nombre" required v-model="nombre" placeholder="ingrese el tipo de documento">
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
    ...mapState('tipoDocumento',['tipoDocumento']),
    ...mapState(['retorno','retorno2']),
  },
//metodos CRUD
  methods:{
    ...mapActions('tipoDocumento',['consultarTipoDocumento','limpiarTipoDocumento']),
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
    async guardar(){
      await axios
      .post('http://localhost:8080/api/tipodocumento',{
        nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Tipo de documento registrado con exito", response.data);
        alert("El tipo de documento es registrado con exito");
        if(this.retorno == 'retorno'){
          this.limpiarTipoDocumento();
          this.consultarTD(response.data.codigo);
          console.log(1);
        }
        else if(this.retorno2 == 'retorno'){
          this.limpiarTipoDocumento();
          this.consultarTD2(response.data.codigo);
          console.log(2);
        } else{
          this.nombre = '';
          this.$emit('escucharForm');
        }
      })
      .catch((error)=>{
        console.error("Error al registrar tipo de documento:", error);
      });
    },
    async consultarTD(valor){
      await this.consultarTipoDocumento(valor);
      await this.$nextTick();
      this.$router.push('aprendiz');
    },
    async consultarTD2(valor){
      await this.consultarTipoDocumento(valor);
      await this.$nextTick();
      this.$router.push('personal');
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/tipodocumento/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre;
        })
        .catch((error) =>{
          console.error("Error al consultar tipo de documento: ", error);
        });
    },

    actualizar(){
      axios
        .put('http://localhost:8080/api/tipodocumento/actualizar/'+this.codigo,{
          nombre: this.nombre,
      })
      .then((response)=>{
        console.log("tipo de documento actualizado con exito", response.data);
        if(this.retorno == 'retorno'){
          this.limpiarTipoDocumento();
          this.consultarTD(response.data.codigo);
          console.log(1);
        }
        else if(this.retorno2 == 'retorno'){
          this.limpiarTipoDocumento();
          this.consultarTD2(response.data.codigo);
          console.log(2);
        } else{
          this.nombre = '';
          this.$emit('escucharForm');
        }
        this.modificar= false;
        this.salvar= true;
      })
      .catch((error)=>{
        console.error("Error al actualizar el tipo de documentoo", error);
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