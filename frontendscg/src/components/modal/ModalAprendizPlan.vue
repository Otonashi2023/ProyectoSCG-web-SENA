<template>
    <div class="modal-overlay" @click ="cerrarModal()">
      <div v-if="cargando" class="loader">
        <img src="@/assets/loading.gif" alt="Cargando..." />
      </div>
        <div class="modal-content" v-show="tabla">
            <h1>plan de entrenamiento</h1>
            <div id="scroll">
                <table>
                <thead>
                <tr>
                    <th>Plan (meses)</th>
                    <th>Rutinas (versión)</th>
                </tr>
                </thead>
                <tbody>
                <tr id="fila2" v-for="(plan, index) in resultado" :key="index">
                    <td>{{ plan.plan.tipoPlan.nombre }}_(<span style="color: #EA0234; font-weight: 600;">{{ plan.plan.meses }}</span>)</td>
                    <td>
                        <tr v-for="(rutina, i) in plan.rutinas" :key="i">
                        <td>
                            {{ rutina.tipoRutina.nombre }}_(<span style="color:#00B69B;font-weight: bold;">{{ rutina.numero }}</span>)
                        </td>
                            <td>
                        <tr class="head2">
                            <td id="space">Ejercicio</td>
                            <td id="space">Tipo ejercicio</td>
                            <td id="space">Musculo</td>
                            <td id="space">Series</td>
                            <td id="space">Repeticiones</td>
                            <td id="space">Descanso</td>
                        </tr>
                        <tr v-for="(ejercicio, j) in rutina.ejercicios" :key="j">
                            <td id="space">{{ ejercicio.nombre.nombre }}</td>
                            <td id="space">{{ ejercicio.tipoEjercicio.nombre }}</td>
                            <td id="space">{{ ejercicio.musculo.nombre }}</td>
                            <td id="space">{{ ejercicio.series }}</td>
                            <td id="space">{{ ejercicio.repeticiones }}</td>
                            <td id="space">{{ ejercicio.descanso }} min</td>
                        </tr>
                        </td>
                        </tr>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>      
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { mapState } from "vuex";
    //contructor de las variables 
    export default {
      data(){
        return{
          cargando: true,
          tabla: false,
          resultado: [],
          finalData: [],
          originalData: [],
          codigo: null,
        }
      },
      computed:{
          ...mapState('aprendizPlan',['aprendizPlan']),        
      },

      methods: {
        async obtenerPlanRutinasYEnriquecer() {
        await axios.get('http://localhost:8080/api/planrutina/listar')
          .then((response) => {
            const data = response.data;
            if (Array.isArray(data)) {
              this.originalData = data;
              return axios.get("http://localhost:8080/api/rutinaejercicio/listar");
            } else {
              throw new Error('La respuesta de la API no es un array');
            }
          })
          .then((response) => {
            const ejerciciosData = response.data;
              this.finalData = this.enriquecerRutinasConEjercicios(ejerciciosData);
              console.log('FINAL_DATA: ', this.finalData);
              const codigo = this.aprendizPlan?.plan?.codigo;
                console.log('CODIGO: ', codigo);
                const resultadoTemp = this.finalData.find(item => item.plan.codigo === codigo);
                this.resultado = resultadoTemp ? [resultadoTemp] : [];
                this.cargando = false;
                this.tabla = true;
                console.log('RESULTADO: ', this.resultado);
          })
          .catch((error) => {
            console.error("Error al obtener y combinar datos:", error);
          });
      },
      groupPlansByRutinas(data) {
        const groupedData = data.reduce((acc, item) => {
          const key = `${item.plan.tipoPlan.nombre}_${item.plan.meses}`;
          if (!acc[key]) {
            acc[key] = { plan: item.plan, rutinas: [] };
          }
          acc[key].rutinas.push({ ...item.rutina, ejercicios: [] }); // Inicialmente sin ejercicios
          return acc;
        }, {});
        return groupedData;
      },
      enriquecerRutinasConEjercicios(ejerciciosData) {
        const combinedData = { ...this.groupPlansByRutinas(this.originalData) };

        ejerciciosData.forEach(ejercicioItem => {
          const rutinaKey = `${ejercicioItem.rutina.tipoRutina.nombre}_${ejercicioItem.rutina.numero}`;

          Object.keys(combinedData).forEach(planKey => {
            const plan = combinedData[planKey];
            const rutina = plan.rutinas.find(rutina => `${rutina.tipoRutina.nombre}_${rutina.numero}` === rutinaKey);

            if (rutina) {
              rutina.ejercicios.push(ejercicioItem.ejercicio);
            }
          });
        });

        return Object.values(combinedData);
          },

        cerrarModal(){
          const modal = false;
          this.$emit('verModal', modal);
          this.result = null;
        },
      },
      mounted(){
        this.obtenerPlanRutinasYEnriquecer();
        console.log('APRENDIZPLAN DESDE MODAL: ', this.aprendizPlan);
      },
    }
  </script>

  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: max-content;
    max-width: 90%;
    text-align: center;
  }
  .loader img {
  width: 50px;
}
  /*.modal-close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
  }*/
  </style>