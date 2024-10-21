<template>
  <div>
    <h1 id="alitext" style="margin-bottom: 20px;">Panel de Control</h1>
  </div>
  <div class="container2">
    <div id="scroll">
      <div style="display: grid; grid-template-columns: auto auto">
        <div style="width: auto">
          <h2>Los planes mas demandados</h2>
        <apexchart type="pie" height="80%" :options="pieOptions" :series="pieSeries"></apexchart>
        </div>
        <div style="width: auto">
          <h2>Rutinas y ejercicios mas usados </h2>
        <apexchart type="bar" height="80%" :options="barOptions2" :series="barSeries2"></apexchart>
        </div>
        <div style="width: auto">
          <h2>Aprendices activos por plan </h2>
        <apexchart type="bar" height="80%" :options="barOptions" :series="barSeries"></apexchart>
        </div>
        <div style="width: auto">
          <h2>Aprendices Nuevos y Recurrentes</h2>
        <apexchart type="pie" height="60%" :options="pieOptions2" :series="pieSeries2"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from "vue3-apexcharts";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    apexchart: ApexCharts,
  },
  data() {
    return {
      // Datos del gráfico de torta
      pieSeries: [],
      pieOptions: {
        chart: {
          type: 'pie',
          events: {}
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        fill: {
          opacity: 0.9
        },
      },

      // Datos del gráfico de barras
      barSeries: [{
        name: 'Aprendices',
        data: []
      },  
    ],
      barOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            rotate: -50,
            style: {
              fontSize: '10px',
              whiteSpace: 'normal'
            },
          },
        },
        yaxis: {
          title: {
            text: 'Cantidad de estudiantes'
          },
        },
        fill: {
          opacity: 0.9
        },
      },

      // Datos del gráfico de barras2
      barSeries2: [{
        name: 'Rutinas',
        data: []
      },
      {
        name: 'Ejercicios',
        data: []
      }],
      barOptions2: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [1, 2, 3, 4],
          labels: {
            rotate: -50,
            style: {
              fontSize: '10px',
              whiteSpace: 'normal'
            },
          },
        },
        yaxis: {
          title: {
            text: 'Cantidad de veces'
          },
        },
        tooltip: {
          y: {
            formatter: (val, { seriesIndex, dataPointIndex }) => {
              const name = seriesIndex === 0 ? this.rutinaNames[dataPointIndex] : this.exerciseNames[dataPointIndex];
              return `${name}: ${val}`;
            },
          },
        },
        fill: {
          opacity: 0.9
        },
      },

      // Datos del gráfico de torta2
      pieSeries2: [],
      pieOptions2: {
        chart: {
          type: 'pie',
          events: {}
        },
        labels: ['Nuevos', 'Recurrentes'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            const value = opts.w.config.series[opts.seriesIndex];
            const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${percentage}% (${value})`;
          },
          style: {
            fontSize: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
          },
        },
        
        fill: {
          opacity: 0.9
        },
      },
    };
  },
  computed:{
    ...mapState('aprendizPlan',['aprendizPlanAll']),
    ...mapState('planRutina',['planRutinaAll']),
    ...mapState('rutinaEjercicio',['rutinaEjercicioAll']),
  },
  methods:{
    ...mapMutations(['clearSearchQuery']),
    ...mapActions('aprendizPlan',['consultarAprendizPlanAll']),
    ...mapActions('planRutina',['consultarPlanRutinaAll']),
    ...mapActions('rutinaEjercicio',['consultarRutinaEjercicioAll']),

    planesMasUsados(){
      if (this.aprendizPlanAll.length > 0 ) {
        const filtroPlanes = this.aprendizPlanAll.reduce((acc, item) => {
          acc[item.plan.tipoPlan.nombre] = (acc[item.plan.tipoPlan.nombre] || 0) + 1;
          return acc;
        }, {});
        
        const sortedPlanes = Object.entries(filtroPlanes)
          .sort((a, b) => b[1] - a[1]);

        const top4Planes = sortedPlanes.slice(0, 4);
        const otherPlanes = sortedPlanes.slice(4);

        const otherSum = otherPlanes.reduce((acc, item) => acc + item[1], 0);

        this.pieSeries = [...top4Planes.map(item => item[1]), otherSum];
        this.pieOptions = {
          ...this.pieOptions,
          labels: [...top4Planes.map(item => item[0]), 'Otros'],
        };
      }
    },

  distribicionAprendizPlan(){
    const hoy = new Date().toISOString().split('T')[0];
    const planNoFinalizado = this.aprendizPlanAll.filter(item => item.finaliza > hoy);    
    const planesAgrupados = planNoFinalizado.reduce((acc, plan) => {
      const planNombre = plan.plan.tipoPlan.nombre; // Nombre del plan
      if (!acc[planNombre]) {
        acc[planNombre] = 0; // Inicializa el contador si no existe
      }
      acc[planNombre] += 1; // Incrementa el contador por cada estudiante en el plan
      return acc;
    }, {});

    const planesArray = Object.entries(planesAgrupados);

    this.barSeries = [{
      name: 'Aprendices',
      data: planesArray.map(item => item[1])//Cantidad de estudiantes por plan
    }];

    this.barOptions = {
      ...this.barOptions,
      xaxis:{
        categories: planesArray.map(item => item[0]), //Nombre de todo los planes activos
      }
    }
  },

  rutinasMasUsadas() {
      if (this.planRutinaAll.length > 0) {
        const filtroRutinas = this.planRutinaAll.reduce((acc, item) => {
          acc[item.rutina.tipoRutina.nombre] = (acc[item.rutina.tipoRutina.nombre] || 0) + 1;
          return acc;
        }, {});
        const sortedRutinas = Object.entries(filtroRutinas)
          .sort((a, b) => b[1] - a[1]);

        const top4Rutinas = sortedRutinas.slice(0, 4);
        this.rutinaNames = top4Rutinas.map(item => item[0]); // Almacena los nombres de las rutinas
        this.barSeries2[0].data = top4Rutinas.map(item => item[1]); // Cantidad de rutinas usadas
      }
    },
    ejerciciosMasUsados() {
      if (this.rutinaEjercicioAll.length > 0) {
        const filtroEjercicio = this.rutinaEjercicioAll.reduce((acc, item) => {
          acc[item.ejercicio.nombre.nombre] = (acc[item.ejercicio.nombre.nombre] || 0) + 1;
          return acc;
        }, {});
        const sortedEjercicios = Object.entries(filtroEjercicio)
          .sort((a, b) => b[1] - a[1]);

        const top4Ejercicios = sortedEjercicios.slice(0, 4);
        this.exerciseNames = top4Ejercicios.map(item => item[0]); // Almacena los nombres de los ejercicios
        this.barSeries2[1].data = top4Ejercicios.map(item => item[1]); // Cantidad de ejercicios usados
      }
    },
    rutinaEjercicios(){
      this.rutinasMasUsadas();
      this.ejerciciosMasUsados();
    },

    aprendicesActivos(){
      const hoy = new Date().toISOString().split('T')[0];
      const aprendicesActivos = this.aprendizPlanAll.filter(item => item.finaliza > hoy);

      const nuevos = [];
      const recurrentes = [];

      aprendicesActivos.forEach(aprendizActivo => {
        const planesAsociados = this.aprendizPlanAll.filter(plan => plan.aprendiz.codigo === aprendizActivo.aprendiz.codigo);
        
        if(planesAsociados.length >2){
          recurrentes.push({
            aprendiz: aprendizActivo.aprendiz,
            planes: planesAsociados,
          });
        } else{
          nuevos.push({
            aprendiz: aprendizActivo.aprendiz,
            planes: planesAsociados,
          });
        } 
      });

      const cantidadNuevos = nuevos.length;
      const cantidadRecurrentes = recurrentes.length;

      this.pieSeries2 = [cantidadNuevos, cantidadRecurrentes];
      this.pieOptions2 = {
        ...this.pieOptions2,
        labels: ['Nuevos', 'Recurrentes'],
      };
    }
  },

  async mounted(){
    this.clearSearchQuery();
    await Promise.all([
      this.consultarAprendizPlanAll(),
      this.consultarPlanRutinaAll(),
      this.consultarRutinaEjercicioAll(),
    ]);
    await this.$nextTick();

    this.planesMasUsados();
    this.distribicionAprendizPlan();
    this.rutinaEjercicios();
    this.aprendicesActivos();
  }
};
</script>
