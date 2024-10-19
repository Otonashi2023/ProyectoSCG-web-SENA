<template>
  <div class="modal-fondo">
    <div v-if="cargando" class="loader">
        <img src="@/assets/loading.gif" alt="Cargando..." style="width: 50px;"/>
      </div>
    <div class="modal-contenido" v-show="tabla">
      <div style="display:grid;grid-template-columns:  auto auto;justify-content:space-between;">
        <div>
          <font-awesome-icon icon="eye-slash" @click="cerrarModal"/>
        </div>
        <select v-model="intervalo" @change="cambiarIntervalo(intervalo)">
          <option value="semanas">Semanas</option>
          <option value="meses">Meses</option>
        </select> 
      </div>   
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

  <script>
  import ApexCharts from "vue3-apexcharts";
import { mapActions, mapState } from "vuex";
  
  export default {
    components: {
      apexchart: ApexCharts,
    },
    data() {
      return {
        cargando: true,
        tabla: false,
        intervalo: "semanas", // Inicialmente mostrar semanas
        seriesSemanas: [
          {
            name: "Asistencia Real",
            data: [],
          },
          {
            name: "Asistencia Perfecta",
            data: []
          },
        ],
        seriesMeses: [
          {
            name: "Asistencia Real",
            data: [], // Asistencia acumulada por meses (ajusta según datos reales)
          },
          {
            name: "Asistencia Perfecta",
            data: [], // Línea de referencia perfecta para 6 meses
          },
        ],
        chartOptions: {
          chart: {
            type: "line",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          stroke: {
            curve: "smooth",
            width: [3, 2],
            dashArray: [0, 5],
          },
          title: {
            text: "Progreso de Asistencia del Aprendiz",
            align: "center",
          },
          xaxis: {
            categories: [],
          },
          yaxis: {
            title: {
              text: "Cantidad de Asistencia",
            },
          },
          markers: {
            size: 5,
            colors: ["#FF3232", "#2823CE"],
          },
          colors: ["#FF3232", "#2823CE"],
          tooltip: {
            theme: "dark",
            x: {
              show: true,
            },
          },
        },
      };
    },
    computed: {
      ...mapState('aprendiz',['aprendiz']),
      ...mapState('asistencia',['asistencias']),
      ...mapState('aprendizPlan',['aprendizPlanAll']),
      ...mapState('planRutina',['planRutinaAll']),

      series() {
        // Cambia las series de datos según el intervalo seleccionado
        return this.intervalo === "semanas" ? this.seriesSemanas : this.seriesMeses;
      },
    },
    methods: {
      ...mapActions('asistencia',['consultarAllAsistencias']),
      ...mapActions('aprendizPlan',['consultarAprendizPlanAll']),
      ...mapActions('planRutina',['consultarPlanRutinaAll']),

      async consultarAll(){
        await this.consultarAllAsistencias();
        await this.consultarAprendizPlanAll();
        await this.consultarPlanRutinaAll();
      },

      planesFiltrados(){
        const filtroPlan = this.aprendizPlanAll.filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        return filtroPlan[filtroPlan.length - 1]
      },
      
      rutinasXsemana(){
        const rutinasPorsemana = this.planRutinaAll.filter(item => item.plan.codigo === this.planesFiltrados().plan.codigo);
        return rutinasPorsemana.length;
      },

      dataMeses(){
        const diasEnMes = {
          enero: 31,
          febrero: 28,
          marzo: 31,
          abril: 30,
          mayo: 31,
          junio: 30,
          julio: 31,
          agosto: 31,
          septiembre: 30,
          octubre: 31,
          noviembre: 30,
          diciembre: 31
        };
        return diasEnMes;
      },

      obtenerDiasTotales(fechaInicio, meses, anio) {
        const [anios, mes, dia] = fechaInicio.split("-").map(Number);
        const fechaInicioObj = new Date(anios, mes - 1, dia);
        let mesInicio = fechaInicioObj.getMonth() + 1;
        let diasTotales = 0;
        this.nombreMes1 = [];

        for (let i = 0; i < meses; i++) {
          if (mesInicio > 12) {
            mesInicio = 1;
            anio++;
          }

          const { nombreMes, dias } = this.obtenerMesYDiasPorNumero(mesInicio, anio);
          this.nombreMes1[i] = nombreMes;
          diasTotales += dias;

          mesInicio++;
        }

        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: this.nombreMes1
          }
        };

        return diasTotales;
      },

      obtenerMesYDiasPorNumero(mesNumero, anio) {
        const indiceMes = mesNumero - 1;
        const nombresMeses = Object.keys(this.dataMeses());
        const diasMeses = Object.values(this.dataMeses());

        const nombreMes = nombresMeses[indiceMes];

        let dias = diasMeses[indiceMes];
        if (nombreMes === 'febrero' && ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0))) {
          dias = 29;
        }
        return { nombreMes, dias };
      },


      obtenerValoresDelPlan() {
        const fechaInicio = this.planesFiltrados().inicio;
        const meses = this.planesFiltrados().plan.meses;
        const fechaObj = new Date(fechaInicio);
        const anio = fechaObj.getFullYear();

        const diasTotales = this.obtenerDiasTotales(fechaInicio, meses, anio);

        return { fechaInicio, meses, anio, diasTotales };
      },

      calcularAsistenciaPerfecta(diasTotales){
        const semanasCompletas = Math.floor(diasTotales / 7);
        const diasSobrantes = diasTotales % 7;
        const totalRutinas = this.rutinasXsemana();    

        const result = totalRutinas * (semanasCompletas + (diasSobrantes / 7));
        const asistenciasPerfectas = Math.floor(result);
        return {asistenciasPerfectas, semanasCompletas};
      },
      
      arraysXY(){
        const { diasTotales } = this.obtenerValoresDelPlan();
        const asist = this.calcularAsistenciaPerfecta(diasTotales);

        if (!asist) {
        console.error('El valor de asist es undefined o null');
        return { etiquetasSemanas: [], asistenciasPerfectas: [] };
      }

        const rutinasPorSemana = this.rutinasXsemana();
        const {asistenciasPerfectas, semanasCompletas} = asist;
        const semanasTotales = semanasCompletas;
        const totalAsistencias = asistenciasPerfectas;

        let rutinasAcumuladas = [];
        let etiquetasSemanas = [];

        let acumulado = 0;

        for (let semana = 1; semana <= semanasTotales; semana++) {
          acumulado += rutinasPorSemana;
          
          if (acumulado > totalAsistencias) {
            acumulado = totalAsistencias;
          }
          
          rutinasAcumuladas.push(acumulado);
          etiquetasSemanas.push(`Semana ${semana}`);
        }
        
        this.seriesSemanas[1].data = rutinasAcumuladas;

        this.chartOptions = {
          ...this.chartOptions,
          xaxis:{
            categories: etiquetasSemanas,
          }
        }

        return {rutinasAcumuladas, etiquetasSemanas}
      },

      getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      },

      asistenciasFiltradas() {
        const filtro = this.asistencias.filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        const planFiltrado = this.planesFiltrados();
        
        const filtroAsistenciasPorPlan = filtro.filter(item => item.fecha > planFiltrado.inicio && item.fecha < planFiltrado.finaliza);
        
        const fechasFiltradas = filtroAsistenciasPorPlan.map(asistencia =>{
          const fechaAsistencia = new Date(asistencia.fecha);
          if (!isNaN(fechaAsistencia)) {
            return fechaAsistencia.toISOString().split('T')[0];
          } else {
            console.error("Fecha inválida: ", asistencia.fecha);
            return null;
          }
        }).filter(fecha => fecha !== null); // Filtra cualquier entrada nula en caso de errores de fecha

        const arrayX = fechasFiltradas.map(fecha => ({
          fecha,
          semana: this.getWeekNumber(fecha)
        }));

        const { diasTotales } = this.obtenerValoresDelPlan();
        const { semanasCompletas } = this.calcularAsistenciaPerfecta(diasTotales);
        const totalSemanas = semanasCompletas;

        let asistenciasPorSemana = new Array(totalSemanas).fill(null);
        
        let count;
        let i = 0;
        let minSemana = Math.min(...arrayX.map(({ semana }) => semana));
        const maxSemana = Math.max(...arrayX.map(({ semana }) => semana));

        for (let semana = minSemana; semana <= maxSemana; semana++){
          count = 0;
          arrayX.forEach(({semana: semanaActual}) => {
            if(semanaActual === semana) {
              count++;
            }
          });
          asistenciasPorSemana[i] = count > 0 ? count : 0;
          i++;
        }

        let asistenciasAcumuladas = [];
        let acumulado = 0;

        for (let i = 0; i < asistenciasPorSemana.length; i++) {
          if (asistenciasPorSemana[i] !== null) {
            acumulado += asistenciasPorSemana[i];
            asistenciasAcumuladas.push(acumulado);
          } else {
            asistenciasAcumuladas.push(null);
          }
        }

        this.seriesSemanas[0].data = asistenciasAcumuladas;

        this.tabla = true;
        this.cargando = false;
      },

      asistenciasPorMes() {
        const filtro = this.asistencias.filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        const planFiltrado = this.planesFiltrados();

        const fechaInicioPlan = new Date(planFiltrado.inicio);
        const fechaFinalPlan = new Date(planFiltrado.finaliza);

        let asistenciasPorMesArray = new Array(planFiltrado.plan.meses).fill(null);

        const hoy = new Date();
        // Contar asistencias por mes
        filtro.forEach(asistencia => {
            const fechaAsistencia = new Date(asistencia.fecha);

            if (fechaAsistencia >= fechaInicioPlan && fechaAsistencia <= fechaFinalPlan) {
                const diffMeses = (fechaAsistencia.getFullYear() - fechaInicioPlan.getFullYear()) * 12 + (fechaAsistencia.getMonth() - fechaInicioPlan.getMonth());

                if (fechaAsistencia <= hoy) {
                    asistenciasPorMesArray[diffMeses-1]++;
                }
            }
        });

        let acumulado = 0;

        if(hoy < new Date(planFiltrado.finaliza)){
          this.max = hoy.getMonth() - fechaInicioPlan.getMonth();
        } else{
          this.max = planFiltrado.plan.meses;
        }

        for (let i = 0; i < this.max; i++) { 
          if(i< this.max) {   
            acumulado += asistenciasPorMesArray[i];
            asistenciasPorMesArray[i] = acumulado;       
        }
      }      

    const sesionesPorMes = 4;
    const asistenciaPerfectaArray = new Array(planFiltrado.plan.meses).fill(sesionesPorMes);
    for (let i = 0; i < this.max; i++) {
        asistenciaPerfectaArray[i] = (i + 1) * sesionesPorMes; // Sesiones acumuladas por mes
    }

    this.seriesMeses[0].data = asistenciasPorMesArray;
    this.seriesMeses[1].data = asistenciaPerfectaArray;
    },

      cambiarIntervalo(tipo) {
        this.intervalo = tipo;
        // Cambia las etiquetas del eje X
        this.chartOptions.xaxis.categories =
          tipo === "semanas"
            ? this.arraysXY().etiquetasSemanas
            : this.nombreMes1;

        this.$nextTick(() => {
          this.chartOptions = { ...this.chartOptions };
        });
      },
      cerrarModal(){
        this.$emit('showModal', false);
      },
      
    },
    mounted(){
      this.cambiarIntervalo(this.intervalo = 'semanas');
      this.consultarAll().then(() => {
        this.planesFiltrados();
        this.rutinasXsemana();
        this.arraysXY();
        this.asistenciasFiltradas();
        this.asistenciasPorMes();
      });
    }
  };
  </script>

<style scoped>
.modal-fondo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    z-index: 9999;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
  }
  
  .modal-contenido {
    margin: 0;
    padding: 0;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    height: auto;
    text-align: center;
    overflow-y:auto;
    overflow-x: auto;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    filter: none;
    transform: none;
  }
</style>
  