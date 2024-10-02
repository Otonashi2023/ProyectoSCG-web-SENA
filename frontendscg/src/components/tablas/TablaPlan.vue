<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Tabla  de Planes</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Meses</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="plan in planesFiltrados" :key="plan.codigo" @click="() => {callMetodoN(); consultarbyId(plan.codigo); consultarbyName(plan.tipoPlan.nombre,plan.meses)}">
            <td>{{ plan.tipoPlan.nombre }}</td>
            <td>{{ plan.meses }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(plan.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(plan.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>      
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        planes:[],
        codigo:null,
      }
    },
    computed:{
      ...mapState('variables',['datos2']),
      ...mapState(['retorno3','retorno2','dato9','plan','searchQuery']),

      planesFiltrados() {
        const query = this.searchQuery;
        return this.planes.filter(plan =>
          plan.tipoPlan.nombre.toLowerCase().includes(query) ||
          plan.meses.toString().includes(query)
        );
      },

    },
    methods: {
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('variables',['actionDatos2','limpiarRutinas','limpiarArrayR','actionActiveM']),
      ...mapActions(['actualizarDato5','actualizarDato9','registrarPlan','limpiarRutina']),

      obtenerPlanes(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/plan/listar")
        .then((response)=>{
          this.planes= response.data;
          this.datos2act();
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener planes: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/plan/'+this.codigo)
        .then(()=>{
          console.log("plan eliminado con exito");
          this.codigo=null;
          this.$emit('escuchartable');
          this.obtenerPlanes();                   
        })
        .catch((error)=>{
          console.log("Error al eliminar rutina", error);
        });
      },
      async datos2act(){
        console.log('PLAN:'.planes);
        await this.actionDatos2(this.planes);
        await this.$nextTick();
        console.log('AQUIIIIIII:',this.datos2);
      },
      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato5(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      consultarbyName(value,numero){
        this.registrarPlan(value);
        this.actualizarDato9(numero);
      },
      limpiarId(){
        this.codigo=null;
      },
      callMetodoN(){
        if(this.retorno3=='retorno'){
          if(this.codigo==null){
            this.limpiarRutina();
            this.limpiarArrayR();
            this.limpiarRutinas();
            this.actionActiveM(true);
            this.$router.push('planRutina');
          }
        }
      },
      formulario(){
        if(this.retorno2=='retorno'){
          this.$emit('goForm');
        }
      },
    },
    mounted(){
      this.clearSearchQuery();
      this.obtenerPlanes();
      this.formulario();
    },
  }
</script>