<template>
  <div>
    <h1 id="alitext" style="margin-bottom: 20px;">Panel de Control</h1>
  </div>
  <div class="container2">
    <div id="scroll">
      <div style="width:95%;display: grid; grid-template-columns: auto auto;">
        
        <div style="width: auto">
          <h2>Gráfico de Torta (Pastel)</h2>
        <apexchart type="pie" height="350px" :options="pieOptions" :series="pieSeries"></apexchart>
        </div>
        <div style="width: auto">
          <h2>Gráfico de Líneas Rectas y Senoidal</h2>
        <apexchart type="line" height="350px" :options="lineOptions" :series="lineSeries"></apexchart>
        </div>
        <div>
        <h2>Gráfico de Líneas con Sombras</h2>
        <apexchart type="line" height="350px" :options="chartOptions" :series="seriesData"></apexchart>
      </div>
      <div style="width: auto">
          <h2>Gráfico de Barras</h2>
        <apexchart type="bar" height="350px" :options="barOptions" :series="barSeries"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: ApexCharts,
  },
  data() {
    return {
      // Datos del gráfico de torta
      pieSeries: [44, 55, 13, 43, 22],
      pieOptions: {
        chart: {
          type: 'pie',
          events: {}
        },
        labels: ['Rojo', 'Azul', 'Amarillo'],
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
        }]
      },

      // Datos del gráfico de barras
      barSeries: [{
        name: 'Ventas',
        data: [44, 55, 41, 64, 22, 43]
      }],
      barOptions: {
        chart: {
          type: 'bar',
          height: 350
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
          categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        },
        yaxis: {
          title: {
            text: 'Ventas'
          }
        },
        fill: {
          opacity: 1
        },
      },

      // Datos del gráfico de líneas rectas y senoidales
      lineSeries: [
        {
          name: 'Línea Recta',
          data: [10, 20, 30, 40, 50, 60]
        },
        {
          name: 'Senoidal',
          data: [Math.sin(0), Math.sin(1), Math.sin(2), Math.sin(3), Math.sin(4), Math.sin(5)]
        }
      ],
      lineOptions: {
        chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['0', '1', '2', '3', '4', '5'],
        },
        yaxis: {
          title: {
            text: 'Valor'
          }
        },
      },

      //graficos con sombra
      seriesData: [
        {
          name: "Ventas",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chartOptions: {
        chart: {
          type: "line",
          height: 350,
        },
        stroke: {
          width: 3, // Ancho de las líneas
          curve: "smooth", // Puedes elegir "smooth" para líneas curvas
        },
        fill: {
          type: "gradient", // Esto agrega un gradiente a la sombra
          gradient: {
            shade: "dark", // Cambia el tipo de sombra (puede ser 'light' o 'dark')
            shadeIntensity: 0.5, // Intensidad de la sombra
            opacityFrom: 0.7, // Opacidad desde
            opacityTo: 0.9, // Opacidad hasta
          },
        },
        markers: {
          size: 4, // Tamaño de los puntos en el gráfico
          colors: ["#FFA41B"], // Color de los puntos
          strokeColors: "#fff", // Color del borde del punto
          strokeWidth: 2, // Ancho del borde del punto
          hover: {
            size: 7, // Tamaño del marcador cuando se pasa el mouse
          },
        },
        xaxis: {
          categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        },
        //para la sombra
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        shadow: {
          enabled: true, // Habilitar sombras
          color: '#ffddff', // Color de la sombra
          top: 10, // Desplazamiento vertical
          left: 10, // Desplazamiento horizontal
          blur: 10, // Desenfoque de la sombra
          opacity: 0.3, // Opacidad de la sombra
        },
      },
    };
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
}
</style>
