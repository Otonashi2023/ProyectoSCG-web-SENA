<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="containerT" id="scroll">
      <h1>Tabla de cargos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="nombre in cargosFiltrados" :key="nombre.codigo" @click="() => {callMetodoN(nombre.codigo); consultarbyId(nombre.codigo);}">
            <td>{{ nombre.nombre }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(nombre.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(nombre.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
    </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        nombres:[],
        codigo: "",
      }
    },
    computed:{
      ...mapState(['retorno2','searchQuery']),

      cargosFiltrados() {
        const query = this.searchQuery;
        return this.nombres.filter(item =>
          item.nombre.toLowerCase().includes(query)
        );
      }
    },
    methods: {
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('cargo',['consultarCargo']),
      ...mapActions(['actualizarDato4']),

      obtenerCargos(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/cargo/listar")
        .then((response)=>{
          this.nombres= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener los cargos: ", error);
        })
      },

      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/cargo/'+this.codigo)
        .then(()=>{
          console.log("Cargo eliminado con exito");
          //Limpiar los campos del formulario despues de eliminar          
          this.codigo = null;
          this.$emit('escuchartable');          
          this.obtenerCargos();
        })
        .catch((error)=>{
          console.log("Error al eliminar el cargo", error);
          alert("No se puede borrar, este dato esta siendo usado.");
          this.codigo=null;
        });
      },
      
      consultarbyId(value){
        console.log('Nombre del cargo', value);
        if(this.codigo==null){
          this.actualizarDato4(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },

      async readCargo(value){
        await this.consultarCargo(value);
        await this.$nextTick();
      },

      async callMetodoN(value){
        if(this.retorno2=='retorno'){
          if(this.codigo==null){
            await this.consultarCargo(value);
            await this.$nextTick();
            this.$router.push('personal');
          }
        }     
      },
      limpiarId(){
        this.codigo=null;
      },
      sender(){
        this.$emit('send',this.nombres);
      }
    },
    mounted(){
      this.clearSearchQuery();
      this.obtenerCargos();
    },
  }
</script>