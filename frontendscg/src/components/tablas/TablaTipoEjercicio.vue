<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="containerT" id="scroll">
      <h1>Tabla de tipos de ejercicio</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="nombre in tipoEjFiltrados" :key="nombre.codigo" @click="() => {callMetodoT(); consultarbyId(nombre.codigo); registrarTipoEjercicio(nombre.nombre)}">
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
        codigo: null,
      }
    },
    computed:{...mapState(['retorno2','searchQuery']),

    tipoEjFiltrados() {
        const query = this.searchQuery;
        return this.nombres.filter(item =>
          item.nombre.toLowerCase().includes(query)
        );
      },
    },
    methods: {
      ...mapMutations(['clearSearchQuery']),
      ...mapActions(['actualizarDato2', 'registrarTipoEjercicio']),

      obtenerTipoEjercicios(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/tipoejercicio/listar")
        .then((response)=>{
          this.nombres= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener tipos de ejercicio: ", error);
        })
      },

      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/tipoejercicio/'+this.codigo)
        .then(()=>{
          console.log("Tipo de ejercicio eliminado con exito");
          //Limpiar los campos del formulario despues de eliminar          
          this.codigo = null;
          this.$emit('escuchartable');          
          this.obtenerTipoEjercicios();
        })
        .catch((error)=>{
          console.log("Error al eliminar el tipo de ejercicio", error);
          alert("No se puede borrar, este dato esta siendo usado.");
          this.codigo=null;
        });
      },

      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato2(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      callMetodoT(){
        if(this.retorno2=='retorno'){
          if(this.codigo==null){
            this.$router.push('ejercicio');
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
      this.obtenerTipoEjercicios();
    },
  }
</script>