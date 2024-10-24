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
        etiquetasSemanas: [],
        nombreMes1: [],
        cargando: true,
        tabla: false,
        intervalo: "semanas",
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
            data: [],
          },
          {
            name: "Asistencia Perfecta",
            data: [],
          },
        ],
        tooltip: {
          y: {
            formatter: function (val, opts) {
                  if (opts && opts.w && opts.w.config && opts.w.config.series && opts.w.config.series[1]) {
                    const value = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex];
                    const total = opts.w.config.series[1].data[opts.w.config.series[1].data.length - 1];
                    if (total > 0) {
                      const porcentaje = ((value / total) * 100).toFixed(2);
                      return `${porcentaje}% (${value})`;
                    } else {
                      return `0% (${value})`;
                    }
                  }
                }
          }
        }
      };
    },
    computed: {
      ...mapState('aprendiz',['aprendiz']),
      ...mapState('asistencia',['asistencias']),
      ...mapState('aprendizPlan',['aprendizPlanAll']),
      ...mapState('planRutina',['planRutinaAll']),

      series() {
        return this.intervalo === "semanas" ? this.seriesSemanas : this.seriesMeses;
      },
      textoProgresoPlan() {
        const plan = this.planesFiltrados();
        if (plan && plan.plan && plan.plan.tipoPlan) {
          return `Progreso del Plan de Entrenamiento - ${plan.plan.tipoPlan.nombre}`;
        } else {
          return 'Progreso del Plan de Entrenamiento';
        }
      },
      chartOptions() {
        return {
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
            text: this.textoProgresoPlan,
            align: "center",
          },
          xaxis: {
            categories: this.intervalo === 'semanas' ? this.etiquetasSemanas : this.nombreMes1 
          },
          yaxis: {
            title: {
              text: "Cantidad y Pordentaje de Asistencias",
            },
            labels: {
              formatter: function (val, opts) {
                if (opts && opts.w && opts.w.config && opts.w.config.series && opts.w.config.series[1]) {
                  const value = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex];
                  const total = opts.w.config.series[1].data[opts.w.config.series[1].data.length - 1];
                  if (total > 0) {
                    const porcentaje = ((value / total) * 100).toFixed(2);
                    return `${porcentaje}% (${value})`;
                  } else {
                    return `0% (${value})`;
                  }
                }
              }
            }
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
        };
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
        console.log(diasTotales);
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
        console.log('IMPORTANTISIMO VERIFICAR: ', rutinasPorSemana);

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
        console.log('miga_planFiltraado:' ,planFiltrado);
        
        const filtroAsistenciasPorPlan = filtro.filter(item => item.fecha >= planFiltrado.inicio && item.fecha <= planFiltrado.finaliza);
        console.log('Miga: ',filtroAsistenciasPorPlan);
        const fechasFiltradas = filtroAsistenciasPorPlan.map(asistencia =>{
          const fechaAsistencia = new Date(asistencia.fecha);
          if (!isNaN(fechaAsistencia)) {
            return fechaAsistencia.toISOString().split('T')[0];
          } else {
            console.error("Fecha inválida: ", asistencia.fecha);
            return null;
          }
        }).filter(fecha => fecha !== null);
console.log('Miga2: ',fechasFiltradas);

        const arrayX = fechasFiltradas.map(fecha => ({
          fecha,
          semana: this.getWeekNumber(fecha)
        }));
        console.log('Miga_ArrayX: ', arrayX);

        const { diasTotales } = this.obtenerValoresDelPlan();
        const { semanasCompletas } = this.calcularAsistenciaPerfecta(diasTotales);
        const totalSemanas = semanasCompletas;
console.log('Miga3', totalSemanas);
        let asistenciasPorSemana = new Array(totalSemanas).fill(null);
        console.log('miga4:',asistenciasPorSemana);
        let count = 0;
        let i = 0;
        let minSemana = this.getWeekNumber(new Date(planFiltrado.inicio));
        console.log('miga minSemana', minSemana);
        const maxSemana = Math.max(...arrayX.map(({ semana }) => semana));
        console.log('miga maxSemana', maxSemana);
        for (let semana = minSemana; semana <= maxSemana; semana++){
          count = 0;
          arrayX.forEach(({semana: semanaActual}) => {
            if(semanaActual === semana) {
              console.log('miga semana actual:',semanaActual)
              count++;
            }
          });
          asistenciasPorSemana[i] = count > 0 ? count : 0;
          console.log('Miga Asitencia por semana: ', asistenciasPorSemana);
          i++;
        }

        let asistenciasAcumuladas = new Array(totalSemanas).fill(null);
        let acumulado = 0;
        let diaDehoy = new Date();
        let semanaVigente = this.getWeekNumber(diaDehoy);
        console.log('Miga Semana vigente: ',semanaVigente);
        let semanaInicio = minSemana;
        let diferencia = ((semanaVigente+1) - semanaInicio);
        console.log('miga semana inicio:', semanaInicio);
        console.log('miga final: ', this.getWeekNumber(planFiltrado.finaliza),planFiltrado.finaliza);
        if(diferencia <= totalSemanas){
          this.max = diferencia;
        } else {
          this.max = asistenciasPorSemana.length;
        }
        const diaDehoyFormatted = diaDehoy.toISOString().split('T')[0]; 
        console.log('Miga diferencia:', semanaVigente-this.getWeekNumber(planFiltrado.inicio));
        console.log('Miga Total semanas:', totalSemanas);
        console.log('Miga Max' , this.max);

        for (let i = 0; i < this.max; i++) {
            acumulado += asistenciasPorSemana[i];
            asistenciasAcumuladas[i] = acumulado;
            console.log('Miga ASISTENCIAS ACUMULADAS: ', asistenciasAcumuladas);
            console.log('Miga this.max: ', this.max);
            if(i==this.max && diaDehoyFormatted <= planFiltrado.finaliza){ 
            alert('Hola');             
              acumulado += asistenciasPorSemana[i+1];
              asistenciasAcumuladas[i+1] = acumulado;
              console.log('Miga acumulada2: ',asistenciasAcumuladas);
            }
            console.log('miga i',i);
            console.log('miga d',diaDehoyFormatted);
            console.log('miga f',planFiltrado.finaliza);
        }

        this.seriesSemanas[0].data = asistenciasAcumuladas;

        this.tabla = true;
        this.cargando = false;
      },

      asistenciasPorMes() {
        const filtro = this.asistencias.filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        console.log('FILTRO: ', filtro);
        const planFiltrado = this.planesFiltrados();

        const fechaInicioPlan = planFiltrado.inicio;
        console.log('FECHA DE INICIO: ', fechaInicioPlan);
        const fechaArrayInicio = fechaInicioPlan.split('-').map(Number);
        const fechaFinalPlan = planFiltrado.finaliza;
        console.log('FECHA DE FINALIZACION: ', fechaFinalPlan);

        let asistenciasPorMesArray = new Array(planFiltrado.plan.meses + 1).fill(null);

        const hoy = new Date().toISOString().split('T')[0];
        const hoyArray = hoy.split('-').map(Number);
        console.log('HOY_:', hoy);

        filtro.forEach(asistencia => {
            const fechaAsistencia = asistencia.fecha.split('T')[0];
            console.log('FECHA DE ASISTENCIA: ', fechaAsistencia);
            const fechaArrayAsistencia = fechaAsistencia.split('-').map(Number);
            let diffMeses = 0;

            if (fechaAsistencia >= fechaInicioPlan && fechaAsistencia <= fechaFinalPlan) {
                diffMeses = (fechaArrayAsistencia[0] - fechaArrayInicio[0]) * 12 + (fechaArrayAsistencia[1] - fechaArrayInicio[1]);
                const diffDias = fechaArrayAsistencia[2] - fechaArrayInicio[2];
    
              if (diffDias < 0) {
                  diffMeses--;
              }
                console.log('FECHA DE ASISTENCIA: ', fechaArrayAsistencia[1]);
                if (fechaAsistencia <= hoy) {
                  console.log('Diff',diffMeses);
                    asistenciasPorMesArray[diffMeses]++;
                    console.log('diferencia de neses: ', diffMeses);
                    console.log('verificando array de registro por mes: ', asistenciasPorMesArray);
                }
            }
        });

        let acumulado = 0;

        if(hoy <= fechaFinalPlan){
          this.max = (hoyArray[1] - fechaArrayInicio[1])+1;
        } else{
          this.max = planFiltrado.plan.meses;
        }
        console.log(asistenciasPorMesArray);

        for (let i = 0; i < this.max; i++) {  
          acumulado += asistenciasPorMesArray[i];
          asistenciasPorMesArray[i] = acumulado;
          console.log('Comparar: ',asistenciasPorMesArray);       
      }      

    const sesionesPorMes = this.calcularSesionesPorMes();
    console.log('revisar',sesionesPorMes);

      let asistenciaPerfectaArray = new Array(planFiltrado.plan.meses).fill(null);

      let acumuladoSesiones = 0;
      for (let i = 0; i < planFiltrado.plan.meses; i++) {
          if (sesionesPorMes[i] !== null) {
              acumuladoSesiones += sesionesPorMes[i];
              asistenciaPerfectaArray[i] = acumuladoSesiones;
          } else {
              asistenciaPerfectaArray[i] = null;
          }
      }

      this.seriesMeses[0].data = asistenciasPorMesArray;
      this.seriesMeses[1].data = asistenciaPerfectaArray;
      },

      calcularSesionesPorMes() {
        const planFiltrado = this.planesFiltrados();

        const anioInicio = parseInt(planFiltrado.inicio.split('-')[0]);
        const anioFinal = parseInt(planFiltrado.finaliza.split('-')[0]);
        const mesInicio = parseInt(planFiltrado.inicio.split('-')[1]);
        const mesFinal = parseInt(planFiltrado.finaliza.split('-')[1])-1; 
        console.log(anioInicio);
        console.log(anioFinal);
        console.log(mesInicio);
        console.log(mesFinal);

        const sesionesPorMes = [];

        for (let anio = anioInicio; anio <= anioFinal; anio++) {
            const mesInicioActual = (anio === anioInicio) ? mesInicio : 0;
            const mesFinalActual = (anio === anioFinal) ? mesFinal : 11;

            for (let mes = mesInicioActual; mes <= mesFinalActual+1; mes++) {
                if (mes === 2) {
                    sesionesPorMes.push(16);
                } else {
                    sesionesPorMes.push(17);
                }
            }
        }

        console.log(sesionesPorMes);
        return sesionesPorMes;
      },

      cambiarIntervalo(intervalo) {
        this.intervalo = intervalo;
        this.generarEtiquetas();
      },

      generarEtiquetas() {
        if (this.intervalo === 'semanas') {
          this.etiquetasSemanas = this.arraysXY().etiquetasSemanas;
        } else {
          this.etiquetasMeses = this.nombreMes1;
        }
      },
    
      cerrarModal(){
        this.$emit('showModal', false);
      },
      
    },
    mounted(){
      this.consultarAll().then(() => {
        this.planesFiltrados();
        this.rutinasXsemana();
        this.arraysXY();
        this.asistenciasFiltradas();
        this.asistenciasPorMes();
        this.calcularSesionesPorMes();
        this.cambiarIntervalo("semanas");
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
  