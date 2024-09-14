<template>
  <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>Tabla  de rutinas de entrenamiento</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Rutina (version)</th>
            <th style="text-align:center">Ejercicios</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in finalData" :key="index" @click="callMetodoR(item.rutina.codigo); consultarbyId(item.rutina.codigo)">
            <td>{{ item.rutina.tipoRutina.nombre}} ({{ item.rutina.numero }})</td>
            <td>
              <tr class="head2">
                <td id="space">Ejercicio</td>
                <td id="space">Tipo ejercicio</td>
                <td id="space">Musculo</td>
                <td id="space">Series</td>
                <td id="space">Repetiociones</td>
                <td id="space">Descanso</td>
              </tr>
              <tr v-for="(ejercicio, i) in item.ejercicios" :key="i">
                <td id="space">{{ ejercicio.nombre.nombre }}</td>
                <td id="space">{{ ejercicio.tipoEjercicio.nombre }}</td>
                <td id="space">{{ ejercicio.musculo.nombre }}</td>
                <td id="space">{{ ejercicio.series }}</td>
                <td id="space">{{ ejercicio.repeticiones }}</td>
                <td id="space">{{ ejercicio.descanso }} min</td>
              </tr>
            </td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.rutina.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" v-if='rele' @click.stop="removeAllByNombre(item.rutina.codigo)"/>
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
      finalData:[],
      originalData: [],
      codigo:null,
    }
  },
  computed:{
    ...mapState('variables',['groupFilter']),
    ...mapState(['retorno','retorno3'])},

  methods: {
    ...mapActions('variables',['limpiarEjercicios','actionDatos','actionGroupFilter']),
    ...mapActions(['limpiarDatoact1']),

    obtenerRutinaEjercicios(){
      // Método para obtener los campos de la lista
      axios.get("http://localhost:8080/api/rutinaejercicio/listar")
      .then((response)=>{
        const data = response.data;
        this.actionDatos(data);
        console.log('Datos de la API:', data);

        if (Array.isArray(data)) {
          this.originalData = data; // Guardar los datos originales
          this.finalData = this.groupDataByName(data);
          this.actionGroupFilter(this.finalData);
          console.log('FINALDATA :', this.finalData);
          console.log('GROUPFILTER: ',this.groupFilter);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
        this.codigo=null;
      })
      .catch((error)=>{
        console.error("Error al obtener rutina_ejercicio: ", error);
      })
    },
    groupDataByName(data) {
      const groupedData = data.reduce((acc, item) => {
        const key = `${item.rutina.tipoRutina.nombre}_${item.rutina.numero}`;
        if (!acc[key]) {
          acc[key] = { rutina: item.rutina, ejercicios: [] };
        }
        acc[key].ejercicios.push(item.ejercicio);
        return acc;
      }, {});
      console.log('GROUPEDDATA: ',groupedData);
      return Object.values(groupedData);
    },

    removeAllByNombre(nombreCodigo) {
      // Obtener los códigos de las filas a eliminar
      const codigosToDelete = this.originalData
        .filter(item => item.rutina.codigo === nombreCodigo)
        .map(item => item.codigo); // Asumiendo que el código es `item.codigo`
        console.log(codigosToDelete);
      // Crear una cadena de promesas de eliminación
      let promiseChain = Promise.resolve();

      codigosToDelete.forEach(codigo => {
        promiseChain = promiseChain
          .then(() => axios.delete(`http://localhost:8080/api/rutinaejercicio/${codigo}`))
          .catch(error => {
            console.error(`Error al eliminar el código ${codigo}:`, error);
          });
      });

      // Después de eliminar todas las entradas, actualizar los datos
      promiseChain.then(() => {
        // Filtrar los datos originales para eliminar todos los ítems con el rutina especificado
        this.originalData = this.originalData.filter(item => item.rutina.codigo !== nombreCodigo);
        // Reagrupar los datos restantes
        this.finalData = this.groupDataByName(this.originalData);
        this.obtenerRutinaEjercicios(); 
      });
    },
    consultarbyId(value){
      this.limpiarEjercicios();
      if(this.codigo==null){
        this.$emit('ById',value,this.finalData);
      }
    },
    actualizar(value){        
        this.limpiarEjercicios();
        this.codigo=value;
        this.$emit('change',this.codigo,this.finalData);
    },
    limpiarId(){
      this.codigo=null;
    },
    callMetodoR(){
        if(this.retorno3=='retorno'){
          if(this.codigo==null){
            this.$router.push('PlanRutina');
          }
        }
      },
    formulario(){
      if(this.retorno=='retorno'){
        this.$emit('goForm');
      }
    },
    desactivar(){
      if(this.retorno3=='retorno'){
        this.rele=false;
      } else{
        this.rele=true;
      }
    },
  },
  mounted(){
    this.obtenerRutinaEjercicios();
    this.formulario();
    this.desactivar();
  },
}
</script>