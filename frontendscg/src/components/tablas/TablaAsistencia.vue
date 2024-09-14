<template>
    <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>Tabla  de asistencias</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>cedula</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in asistencias" :key="index">
            <td>pendiente</td>
            <td>{{ item.aprendiz.persona.nombres}}</td>
            <td>{{ item.aprendiz.persona.apellidos}}</td>
            <td>{{ item.aprendiz.persona.cedula}}</td>  
            <td>{{ formatearFechaYHora(item.fecha) }}</td>    
          </tr>      
        </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default{
    computed:{
        ...mapState('asistencia',['asistencias']), 
    },
    methods:{
        ...mapActions('asistencia',['consultarAllAsistencias']),
        
        formatearFechaYHora(fecha) {
            const date = new Date(fecha);
            const [fechaParte, tiempoParte] = date.toISOString().split('T');
            const hora = tiempoParte.split('.')[0];
            return `${fechaParte} ${hora}`;
        },   
    },
    mounted(){
      this.consultarAllAsistencias();
    }
}

</script>