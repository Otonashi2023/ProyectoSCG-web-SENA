<template>
    <div class="container2" id="form">
      <h1>Asignación del plan de entrenamiento</h1>
      <form @submit.prevent="servicio">
        <div class="comp-form-group2">
          <div class="form-group">
            <label for="aprendiz">Aprendiz: </label>
            <input type="text" name="aprendiz" id="input2" v-model="vaprendiz" placeholder="ingrese el aprendiz" readonly disabled>
          </div>
          <div class="form-group">
            <label for="plan">Plan: <span style="color:magenta; font-weight: 700;">{{ meses }} </span> meses </label>
            <input type="text" name="plan" id="input2" @click="callMetodoP" v-model="vplan" placeholder="ingrese el plan" readonly>
          </div> 
          <div class="form-group">
            <label for="fecha">Fecha de inicio: </label>
            <input type="date" name="inicio" id="input2" v-model="inicio" @click="verificar"  @change="tofinalizacion" required>
          </div>
          <div class="form-group">
            <label for="finaliza">fecha de finalización: </label>
            <input type="date" name="finaliza" id="input2" v-model="finaliza" readonly>
            </div> 
        </div>

        <div id="dist">
          <div></div>
          <div id="formbutton">
              <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
              <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
              <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
          <div></div>
        </div> 
      </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return{
      vaprendiz: '',
      vplan:'',
      inicio: '',
      finaliza: '', 
      salvar: true,
      modificar: false,
      meses: null,
    };
  },

  computed:{
    ...mapState('aprendiz',['aprendiz']),
    ...mapState('aprendizPlan',['aprendizPlan','aprendizPlanAll']),
    ...mapState(['retorno4','datoact3']),
  },
//metodos CRUD
  methods:{
    ...mapActions('aprendizPlan',['guardarAprendizPlan','consultarAprendizPlan','limpiarCodigoAprendizPlan','actualizarAprendizPlan']),
    ...mapActions(['actualizarRetorno4','limpiarRetorno4','limpiarDatoact3','actualizarDatoact3']),

    tofinalizacion(){
      let dataInput = this.inicio;
      let dateInicio = new Date(dataInput);
      this.inicio= dateInicio.toISOString().split('T')[0];
      let date = new Date(dataInput);
      let incrementoMes =this.meses;
      console.log(incrementoMes);
      let mesTotal = date.getMonth() + incrementoMes;

      if (mesTotal >= 12) {
        // Calcula el nuevo mes y ajusta el año
        const mes = mesTotal % 12;
        date.setMonth(mes);        
        const yearTotal = date.getFullYear() + Math.floor(mesTotal / 12);
        date.setFullYear(yearTotal);
      } else {
        // Si no supera el año, solo ajusta el mes
        date.setMonth(mesTotal);
      }
      if(this.finaliza != null){
        this.finaliza = date.toISOString().split('T')[0];
        console.log('Fecha: ', this.finaliza);
      }
    },
    getNombreAp(){
      const nombre = (this.aprendiz?.persona?.nombres).split(' ')[0];
      const apellido = this.aprendiz?.persona?.apellidos.split(' ')[0];
      this.vaprendiz = [nombre, apellido].join(' ');
    },
    setCurrentDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      this.currentDate = `${year}-${month}-${day}`;
    },
    cargarDatos(){
      this.getNombreAp();
      this.vplan = this.aprendizPlan?.plan?.tipoPlan?.nombre;
      this.inicio = this.aprendizPlan?.inicio;
      this.finaliza= this.aprendizPlan?.finaliza;
      this.meses = this.aprendizPlan?.plan?.meses;
    },
    verificar(){
      console.log('codigo del plan: ',this.aprendizPlan?.plan?.codigo);
      if(this.aprendizPlan?.plan?.codigo == null || this.aprendizPlan?.plan?.codigo == undefined){
        alert('Elija un plan primero');
      }
      else{ console.log('aprendizPlan: ',this.aprendizPlan)}
    },
    dataAprendizPlan(){
      this.data ={
        codigo:this.aprendizPlan.codigo,
        inicio: this.inicio,
        finaliza:this.finaliza,
        aprendiz: this.aprendiz.codigo,
        plan: this.aprendizPlan.plan.codigo,          
      };
      console.log('DATA: ', this.data); 
  },
  servicio(){
      if(this.salvar==true){
        this.registrarAprendizPlan();
      }
      else{
        this.modificaAPrendizPlan();
      }
    },
    async registrarAprendizPlan(){
      await this.limpiarCodigoAprendizPlan();
      await this.$nextTick();
      try{
        this.dataAprendizPlan();
        await this.guardarAprendizPlan(this.data);
        await this.$nextTick();
        this.$emit('leave');
      } catch(error){
        console.error("Error al guardar aprendiz:", error);
      }
    },
    async modificaAPrendizPlan(){
      try{
        this.dataAprendizPlan();
        await this.actualizarAprendizPlan({codigo:this.data.codigo, data:this.data});
        await this.$nextTick();
        this.$emit('leave');
      } catch(error){
        console.error("Error al actualizar la asignacion de plan de entrenamineto:", error);
      }
    },

    async read(value){
      if(this.datoact3 == null){
        this.rotar();
      }
      await this.$nextTick();
      const idAprendizPlan = this.aprendizPlanAll.filter(item => item.codigo === value).map(item => item.codigo);
      await this.consultarAprendizPlan(idAprendizPlan);
      await this.$nextTick();
      this.cargarDatos();

      console.log('idAprendizPlan: ', idAprendizPlan);
      console.log('aprendizPlan: ', this.aprendizPlan);
    },
    clear(){
      this.vplan = '';
      this.inicio = '';
      this.finaliza = '';
      this.meses= '';
    },
    loadDatos3(){
      console.log('APRENDIZ PLAN: ', this.aprendizPlan);
      this.vplan = this.aprendizPlan?.plan?.tipoPlan?.nombre;
      this.meses = this.aprendizPlan?.plan?.meses;
      this.setCurrentDate();
      this.inicio = this.currentDate;
      this.tofinalizacion();
    },
    
    update(value){
      this.actualizarDatoact3(value);
      this.variar();
    },
    cerrar(){
      this.clear();
      this.rotar();
      this.limpiarDatoact3();
    },
    rotar(){
      this.modificar= false;
      this.salvar= true;
    },
    variar(){
      if(this.datoact3!=null){
        this.modificar=true;
        this.salvar=false;
      }
    },
    
    callMetodoP(){
      this.limpiarRetorno4();
      this.actualizarRetorno4('retorno');
      console.log('retorno4: ', this.retorno4);
      this.$router.push('planRutina');
    },
  },
  mounted(){
    this.getNombreAp();
    this.cargarDatos();
  }
}
</script>