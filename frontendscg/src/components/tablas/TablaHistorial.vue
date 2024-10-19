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
            <th>fecha</th>
            <th>hora</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in fichasFiltradas" :key="index">
            <td>{{ item.aprendiz.persona.nombres}}</td>
            <td>{{ item.aprendiz.persona.apellidos}}</td>
            <td>{{ item.aprendiz.persona.cedula}}</td>  
            <td>{{ item.fecha }}</td>
            <td>{{ item.hora }}</td>    
          </tr>      
        </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default{
    data(){
        return{
            filtroAprendiz: null,
        }
    },

    computed:{
        ...mapState('aprendiz',['aprendiz']),
        ...mapState('asistencia',['asistencias']), 
        ...mapState(['searchQuery']),

        fichasFiltradas() {
        const query = this.searchQuery;
        if (!this.filtroAprendiz || this.filtroAprendiz.length === 0) {
            return [];
        }
        return this.filtroAprendiz.filter(item => {
            const fechaString = item.fecha;
            return fechaString.includes(query);
        });
        }
    },

    methods:{
        ...mapMutations(['clearSearchQuery']),
        ...mapActions('aprendiz',['consultarAprendiz']),
        ...mapActions('asistencia',['consultarAllAsistencias']),
        
        formatearFechaYHora(fecha) {
            const date = new Date(fecha);
            const [fechaParte, tiempoParte] = date.toISOString().split('T');
            const hora = tiempoParte.split('.')[0];
            return {
                fecha: fechaParte,
                hora: hora
            };
        },
        filtrarAsistenciasPorAprendiz(codigoAprendiz) {
            return this.asistencias.filter(item => item.aprendiz.codigo === codigoAprendiz);
        },

        ordenarAsistenciasPorFecha(asistencias) {
            return asistencias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        },

        formatearFechasAsistencias(asistencias) {
            return asistencias.map(asistencia => {
                const { fecha, hora } = this.formatearFechaYHora(asistencia.fecha);
                return {
                    ...asistencia,
                    fecha,
                    hora
                };
            });
        },

        async read(value) {
            this.clearSearchQuery();
            await this.consultarAllAsistencias();
            
            let asistenciasFiltradas = this.filtrarAsistenciasPorAprendiz(value);

            asistenciasFiltradas = this.ordenarAsistenciasPorFecha(asistenciasFiltradas);

            this.filtroAprendiz = this.formatearFechasAsistencias(asistenciasFiltradas);
            console.log(this.filtroAprendiz);
            
            return this.filtroAprendiz;
        }
    },
}

</script>