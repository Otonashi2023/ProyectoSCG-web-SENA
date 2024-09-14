<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="containerT" id="scroll">
      <h1>Tabla de formaciones académicas</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="nombre in nombres" :key="nombre.codigo" @click="() => {callMetodoN(nombre.codigo); consultarbyId(nombre.codigo);}">
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
import { mapActions, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        nombres:[],
        codigo: "",
      }
    },
    computed:{
      ...mapState('formacion',['formacion']),
      ...mapState(['retorno2'])},
    methods: {
      ...mapActions('formacion',['consultarFormacion','limpiarFormacion']),
      ...mapActions(['actualizarDato4']),

      obtenerFormaciones(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/formacion/listar")
        .then((response)=>{
          this.nombres= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener nombres de formaciones académicas: ", error);
        })
      },

      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/formacion/'+this.codigo)
        .then(()=>{
          console.log("Nombre de la formacion eliminado con exito");
          //Limpiar los campos del formulario despues de eliminar          
          this.codigo = null;
          this.$emit('escuchartable');          
          this.obtenerFormaciones();
        })
        .catch((error)=>{
          console.log("Error al eliminar el nombre de la formacion", error);
          alert("No se puede borrar, este dato esta siendo usado.");
          this.codigo=null;
        });
      },

      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato4(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      async callMetodoN(value){
        if(this.retorno2=='retorno'){
          if(this.codigo==null){
            this.limpiarFormacion();
            await this.consultarFormacion(value);
            await this.$nextTick();
            this.$router.push('ficha');
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
        this.obtenerFormaciones();
    },
  }
</script>