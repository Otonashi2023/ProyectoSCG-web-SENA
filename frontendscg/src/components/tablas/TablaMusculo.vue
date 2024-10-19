<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="containerT" id="scroll2">
      <h1>Tabla de nombres de musculo</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="nombre in musculoEjFiltrados" :key="nombre.codigo" @click="() => {callMetodoM(); consultarbyId(nombre.codigo); registrarMusculo(nombre.nombre)}">
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
    computed:{...mapState(['retorno2','musculo','searchQuery']),

    musculoEjFiltrados() {
        const query = this.searchQuery;
        return this.nombres.filter(item =>
          item.nombre.toLowerCase().includes(query)
        )
        .reverse();
      },
    },
    methods: {
      ...mapMutations(['clearSearchQuery']),
      ...mapActions(['actualizarDato3', 'registrarMusculo']),

      obtenerMusculos(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/musculo/listar")
        .then((response)=>{
          this.nombres= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener nombres de musculo: ", error);
        })
      },

      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/musculo/'+this.codigo)
        .then(()=>{
          console.log("Nombre del musculo eliminado con exito");
          //Limpiar los campos del formulario despues de eliminar          
          this.codigo = null;
          this.$emit('escuchartable');          
          this.obtenerMusculos();
        })
        .catch((error)=>{
          console.log("Error al eliminar el nombre del musculo", error);
          alert("No se puede borrar, este dato esta siendo usado.");
          this.codigo=null;
        });
      },

      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato3(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      callMetodoM(){
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
      this.obtenerMusculos();
    },
  }
</script>