<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Tabla  de ejercicios</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Musculo</th>
            <th>Series</th>
            <th>Repeticiones</th>
            <th>Descanso</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="ejercicio in ejercicios" :key="ejercicio.codigo" @click="() => {callMetodoE(ejercicio.codigo);
            consultarbyId(ejercicio.codigo);addEjercicio(ejercicio.nombre.codigo, ejercicio.tipoEjercicio.codigo, ejercicio.musculo.codigo)}">
            <td>Pendiente</td>
            <td>{{ ejercicio.nombre.nombre }}</td>
            <td>{{ ejercicio.tipoEjercicio.nombre }}</td>
            <td>{{ ejercicio.musculo.nombre }}</td>
            <td>{{ ejercicio.series }}</td>
            <td>{{ ejercicio.repeticiones }}</td>
            <td>{{ ejercicio.descanso }} min</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(ejercicio.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar"  v-if='rele' @click="eliminar(ejercicio.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>      
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        ejercicios:[],
        codigo:null,
      }
    },
    computed:{
      ...mapState('variables',['datos2']),
      ...mapState(['retorno','retorno2','dato7'])},
    
    methods: {
      ...mapActions('datosEjercicio',['actualizarNombreCode','actualizarTipoEjercicioCode','actualizarMusculoCode']),
      ...mapActions('variables',['actionDatos2']),
      ...mapActions(['actualizarDato7','registrarEjercicio']),

      obtenerEjercicios(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/ejercicio/listar")
        .then((response)=>{
          this.ejercicios= response.data;
          this.actionDatos2(this.ejercicios);
          console.log('DATOS2_', this.datos2);
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener ejercicios: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/ejercicio/'+this.codigo)
        .then(()=>{
          console.log("Ejercicio eliminado con exito");
          this.codigo=null;
          this.$emit('escuchartable');
          this.obtenerEjercicios();                 
        })
        .catch((error)=>{
          console.log("Error al eliminar ejercicio", error);
        });
      },
      addEjercicio(value1, value2, value3){
        this.actualizarNombreCode(value1);
        this.actualizarTipoEjercicioCode(value2);
        this.actualizarMusculoCode(value3);
      },
      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato7(value);
          this.$emit('ById',value);
        }
      },
      async actualizar(value){
        console.log('VALOR CODIGO: ',value);
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      limpiarId(){
        this.codigo=null;
      },
      callMetodoE(){
        if(this.retorno=='retorno'){
          if(this.codigo==null){
            this.$router.push('rutinaEjercicio');
          }
        }
      },
      formulario(){
        if(this.retorno2=='retorno'){
          this.$emit('goForm');
        }
      },
      desactivar(){
        if(this.retorno=='retorno'){
          this.rele=false;
        } else{
          this.rele=true;
        }
      },
    },
    mounted(){
      this.obtenerEjercicios();
      this.formulario();
      this.desactivar();
    },
  }
</script>