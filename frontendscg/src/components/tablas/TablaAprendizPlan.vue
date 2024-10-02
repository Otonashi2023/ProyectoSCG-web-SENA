<template>
    <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>planes de entrenamiento</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Inicio</th>
            <th>Finaliza</th>
            <th>Plan de entrenamiento</th>
            <th>Tiempo</th>
            <th>Estado</th>
            <th>Ver</th>
            <th>Cancelacion</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in apPlanFiltrados" :key="index" @click="consultarbyId(item.codigo);">
            <td>{{ item.aprendiz?.persona?.nombres}}</td>
            <td>{{ item.aprendiz?.persona?.apellidos }}</td>
            <td>{{ item.inicio }}</td>
            <td>{{ item.finaliza }}</td>
            <td>{{ item.plan.tipoPlan.nombre }}</td>
            <td>{{ item.plan.meses }} meses</td>
            <td :style="evaluacion(item.finaliza).style">{{ evaluacion(item.codigo).estado }}</td>
            <td style="color: blueviolet; font-weight: 700;" @click.stop="abrirModal(item.codigo)">ver plan</td>
            <td>
              <font-awesome-icon icon="computer-mouse" id="cancelacion" @click.stop="cancelacion(item)"/>
            </td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click.stop="eliminar(item.codigo)"/>
            </td>            
          </tr>      
        </tbody>
    </table>
    </div> 
    <p>AP:{{ aprendizPlan }}</p>
    <p>plan:{{ plan }}</p> 
    <p>aprendiz:{{ aprendiz }}</p>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default{
  data(){
    return{
      filtradoApPlan: null,
      finaliza:'',
    }
  },
    computed:{
      ...mapState('aprendiz',['aprendiz']),
      ...mapState('plan',['plan']),
      ...mapState('aprendizPlan',['aprendizPlan','aprendizPlanAll']),
      ...mapState(['retorno4','searchQuery']),

      apPlanFiltrados() {
        const query = this.searchQuery;
        if (!this.filtradoApPlan) {
          return [];
        }
        return this.filtradoApPlan.filter(item =>
          item.inicio.toLowerCase().includes(query) ||
          item.finaliza.toLowerCase().includes(query) ||
          item.plan.tipoPlan.nombre.toLowerCase().includes(query) /*||
          item.plan.meses.toString().includes(query)*/
        );
      },
    },
    methods:{
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('plan',['consultaPlan']),
      ...mapActions('aprendizPlan',['consultarAprendizPlanAll','consultarAprendizPlan','eliminarAprendizPlan','limpiarAprendizPlan','actualizarAprendizPlan']),
      
      async aprendizPlanFiltrado(){
        await this.consultarAprendizPlanAll();
        await this.$nextTick();
        this.filtradoApPlan = this.aprendizPlanAll
          .filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        console.log('filtradizApPlan: ',this.filtradoApPlan);
        console.log('aprendizPlanAll: ',this.aprendizPlanAll);
      },
      async eliminar(value){
        await this.eliminarAprendizPlan(value);
        await this.$nextTick();
        this.aprendizPlanFiltrado();
      },
      consultarbyId(value){
        this.$emit('ById', value, this.filtradoApPlan);
      },
      actualizar(value){  
        this.$emit('change', value);
      },
      formulario(){
        if(this.retorno4 =='retorno'){
          this.$emit('goForm');
        }
      },  
      async abrirModal(value){
        this.limpiarAprendizPlan();
        console.log('APRENDIZ_PLAN_CLEAR: ',this.aprendizPlan);
        console.log('APRENDIZ_PLAN_SETBEFORE: ',this.aprendizPlan);
        console.log('VALUE: ', value);
        await this.consultarAprendizPlan(value);
        console.log('AQUI EN TABLA APRENDIZ_PLAN_AFTER: ', this.aprendizPlan);
        const modal =true;
        this.$emit('verModal', modal);
      },

      verificar(){
        const dateEnd = this.filtro.finaliza;
        console.log(dateEnd);
        if(this.filtro.codigo){
          const today = new Date();
          const finalDate = new Date(dateEnd);
          const status = finalDate > today ? 'En proceso' : "Terminado";
          return status;
        } else{
          const status = 'Cancelado';
          return status;
        }
      },
      async cancelacion(value){
        const today = new Date();
        const finalizado = today.toISOString().split('T')[0];
        const data = {
          inicio: value.inicio,
          finaliza: finalizado,
          aprendiz: value.aprendiz.codigo,
          plan: value.plan.codigo,
        }
        console.log(value);
        await this.actualizarAprendizPlan({codigo: value.codigo, data: data});
        this.aprendizPlanFiltrado();
      },
      
      tofinalizacion() {
        let dataInput = this.inicio;

        // Intentar convertir dataInput a una fecha
        let dateInicio = new Date(dataInput);

        // Verificar si dataInput es una fecha válida
        if (isNaN(dateInicio.getTime())) {
          console.error("Error: 'inicio' no es una fecha válida.");
          return;
        }

        // Convertir a formato ISO solo si es válida
        this.inicio = dateInicio.toISOString().split('T')[0];

        // Crear una copia de dateInicio para trabajar con la fecha
        let date = new Date(dateInicio);
        let incrementoMes = this.meses;
        console.log("Incremento de meses:", incrementoMes);

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

        // Verificación correcta de finaliza1
        if (this.finaliza1 != null && this.finaliza1 != undefined) {
          this.finaliza1 = date.toISOString().split('T')[0];
          console.log('Fecha final:', this.finaliza1);
        } else {
          this.finaliza1 = '';
        }
      },
      estadoAP(){
        //this.tofinalizacion();
        if(this.finaliza < this.finaliza1){
          const status = 'cancelado';
          return status;
        } else{
          const status ='OK';
          return status;
        }
      },

      evaluacion(value){
        this.filtradoApPlan;
        this.filtro =this.filtradoApPlan.filter(item => item.codigo === value);
        console.log(this.filtro);

        const estadoStyle = {
          estado: '',
          style: {},
        };
        const indice = this.verificar(); 
        if(indice == 'En proceso' ){
          estadoStyle.estado = 'En proceso';
          estadoStyle.style = {
            color: 'blue',
            fontWeight: '700'
          }
        }
        else if(indice == 'Terminado' ){
          estadoStyle.estado ='Terminado';
          estadoStyle.style = {
            color: 'green',
            fontWeight: '700'
          }
        }
        else{
          estadoStyle.estado ='Cancelado';
          estadoStyle.style = {
            color: 'red',
            fontWeight: '700'
          }
        }
        return estadoStyle;
      }
    },
    mounted(){
      this.clearSearchQuery();
      this.aprendizPlanFiltrado();
      this.formulario();
    }
}

</script>