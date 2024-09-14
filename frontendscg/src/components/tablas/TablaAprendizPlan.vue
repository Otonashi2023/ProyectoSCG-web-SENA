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
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in filtradoApPlan" :key="index" @click=consultarbyId(item.codigo)>
            <td>{{ item.aprendiz?.persona?.nombres}}</td>
            <td>{{ item.aprendiz?.persona?.apellidos }}</td>
            <td>{{ item.inicio }}</td>
            <td>{{ item.finaliza }}</td>
            <td>{{ item.plan.tipoPlan.nombre }}</td>
            <td>{{ item.plan.meses }} meses</td>
            <td :style="evaluacion(item.finaliza).style">{{ evaluacion(item.finaliza).estado }}</td>
            <td style="color: blueviolet; font-weight: 700;" @click.stop="abrirModal(item.codigo)">ver plan</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click.stop="eliminar(item.codigo)"/>
            </td>            
          </tr>      
        </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default{
  data(){
    return{
      filtradoApPlan: null,
    }
  },
    computed:{
      ...mapState('aprendiz',['aprendiz']),
      ...mapState('aprendizPlan',['aprendizPlan','aprendizPlanAll']),
      ...mapState(['retorno4']),
    },
    methods:{
      ...mapActions('aprendizPlan',['consultarAprendizPlanAll','consultarAprendizPlan','eliminarAprendizPlan','limpiarAprendizPlan']),
      
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

      verificar(value){
        const today = new Date();
        const finalDate = new Date(value);
        const status = finalDate < today ? 'En proceso' : "Terminado";
        return status;
      },
      evaluacion(value){
        const estadoStyle = {
          estado: '',
          style: {},
        };
        //this.verificar(value);
        const indice = this.verificar(value); 

        if(indice != 'En proceso' ){
          estadoStyle.estado = 'En proceso';
          estadoStyle.style = {
            color: 'blue',
            fontWeight: '700'
          }
        }
        else{
          estadoStyle.estado ='Terminado';
          estadoStyle.style = {
            color: 'green',
            fontWeight: '700'
          }
        }
        return estadoStyle;
      }
    },
    mounted(){
      this.aprendizPlanFiltrado();
      this.formulario();
    }
}

</script>