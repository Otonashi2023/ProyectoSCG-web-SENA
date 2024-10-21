<template>
    <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>Tabla  de asistencias</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>cedula</th>
            <th>Ultima Fecha</th>
            <th>Hora</th>
            <th>Plan vigente</th>
            <th>Estado</th>
            <th>Grafica</th>
            <th>Historial</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in filtrados" :key="index">
            <td>{{ item.persona.nombres}}</td>
            <td>{{ item.persona.apellidos}}</td>
            <td>{{ item.persona.cedula}}</td>  
            <td>{{ ultimaAsistenciaFecha(item.codigo) }}</td>
            <td>{{ ultimaAsistenciaHora(item.codigo) }}</td>
            <td>{{ planActual(item.codigo).tipoNombre }}</td>
            <td :style="estadoPlan(item.codigo).style">{{ estadoPlan(item.codigo).estado }}</td>
            <td><font-awesome-icon icon="compass-drafting" id="editar" @click="abrirModal(item.codigo)" /></td>
            <td><font-awesome-icon icon="timeline" id="editar" @click="consultarById(item.codigo)"/></td>
          </tr>      
        </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default{
    computed:{
      ...mapState('aprendiz',['aprendices']),
      ...mapState('asistencia',['asistencias']), 
      ...mapState('aprendizPlan',['aprendizPlanAll']),
      ...mapState(['searchQuery']),

      filtrados() {
        const query = this.searchQuery.toLowerCase();
        const aprendicesFiltrados = this.aprendices.filter(item => {
          const nombre = item.persona.nombres.toLowerCase();
          const apellido = item.persona.apellidos.toLowerCase();
          const cedula = item.persona.cedula.toString();
          const ultimaAsistenciaFecha = this.ultimaAsistenciaFecha(item.codigo);
          const ultimaAsistenciaHora = this.ultimaAsistenciaHora(item.codigo);
          const planActual = this.planActual(item.codigo);
          const estadoPlan = this.estadoPlan(item.codigo);

          return nombre.includes(query) || 
                apellido.includes(query) || 
                cedula.includes(query) || 
                (ultimaAsistenciaFecha && ultimaAsistenciaFecha.includes(query)) ||
                (ultimaAsistenciaHora && ultimaAsistenciaHora.includes(query)) ||
                (planActual.tipoNombre && planActual.tipoNombre.toLowerCase().includes(query)) ||
                (estadoPlan.estado && estadoPlan.estado.toLowerCase().includes(query));
        }).reverse();

        const enProceso = [];
        const terminado = [];
        const sinPlan = [];
        
        aprendicesFiltrados.forEach(item => {
          const estado = this.estadoPlan(item.codigo).estado;
          
          if (estado === 'En progreso') {
            enProceso.push(item);
          } else if (estado === 'Terminado') {
            terminado.push(item);
          } else {
            sinPlan.push(item);
          }
        });

       return [...enProceso, ...terminado, ...sinPlan];
      }
    },
    methods:{
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('aprendiz',['consultarAllAprendices','consultarAprendiz']),
      ...mapActions('asistencia',['consultarAllAsistencias']),
      ...mapActions('aprendizPlan',['consultarAprendizPlanAll']),

      async consultarAll(){
        await this.consultarAllAprendices();
        await this.consultarAllAsistencias();
        await this.consultarAprendizPlanAll();
      },
      ultimaAsistencia(codigo) {
        const asistenciasAprendiz = this.asistencias.filter(a => a.aprendiz.codigo === codigo );
        //asistenciasAprendiz.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        asistenciasAprendiz.reverse();
        return asistenciasAprendiz.length > 0 ? asistenciasAprendiz[0].fecha : null;
      },
      ultimaAsistenciaFecha(codigo) {
        const fechaCompleta = this.ultimaAsistencia(codigo);
        if (fechaCompleta) {
          const date = new Date(fechaCompleta);
          return date.toISOString().split('T')[0];
        }
        return null;
      },
      
      ultimaAsistenciaHora(codigo) {
        const fechaCompleta = this.ultimaAsistencia(codigo);
        if (fechaCompleta) {
          const date = new Date(fechaCompleta);
          const tiempoParte = date.toISOString().split('T')[1];
          return tiempoParte.split('.')[0];
        }
        return null;
      },

      planActual(codigo){
        const planVigente = this.aprendizPlanAll.filter(item => item.aprendiz.codigo === codigo);
        planVigente.reverse();
        planVigente[0];
        return {
          planEnCurso: planVigente[0],
          tipoNombre: planVigente.length > 0 ? planVigente[0].plan.tipoPlan.nombre : null
        }
      },

      estadoPlan(codigo){
        const estadoStyle = {
          estado: '',
          style: {},
        };
        const { planEnCurso } = this.planActual(codigo);
        
        if(!planEnCurso || !planEnCurso.inicio || !planEnCurso.finaliza){
          estadoStyle.estado = 'Sin plan';
          estadoStyle.style = {
            color: 'gray',
            fontWeight: '400'
          };
          return estadoStyle;
        } 

        const inicio = new Date(planEnCurso.inicio);
        const finaliza = new Date(planEnCurso.finaliza);

        if (inicio < new Date() && finaliza > new Date()) {
          estadoStyle.estado = 'En progreso';
          estadoStyle.style = {
            color: 'blue',
            fontWeight: '700'
          };
        } 
        else if(finaliza < new Date()){
          estadoStyle.estado = 'Terminado';
          estadoStyle.style = {
            color: 'green',
            fontWeight: '700'
          }
        }
        else{
          estadoStyle.estado = 'Sin plan';
          estadoStyle.style = {
            color: 'gray',
            fontWeight: '700'
          }
        }
        return estadoStyle;
      },

      consultarById(value){
        this.$emit('read', value);
      },
      abrirModal(value){
        this.consultarAprendiz(value);
        const validar = this.aprendizPlanAll.some(item => item.aprendiz.codigo === value);
        if(validar){
          this.$emit('showModal', true);
        } else{
          alert('El aprendiz no tiene asignado un plan');
        }
      },
    },
    mounted(){
      this.clearSearchQuery();
      this.consultarAll();
      this.planActual();
    }
}

</script>